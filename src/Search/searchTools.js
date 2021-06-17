// @flow
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import type { QueryType } from "./Types/QueryType";

// function which normalize input values
export const transformString = (str: string): string => {
  return str
    .toString()
    .toLowerCase()
    .replace(/ /g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// function which compares data table value with searched value in terms of type and operator
type FilterByColNameAndOp = {
  comparedValue: string | number | boolean,
  operator: string,
  searchedValue: string
};

export const filterByColNameAndOp = ({
  comparedValue,
  operator,
  searchedValue
}: FilterByColNameAndOp): boolean => {
  let res: boolean = false;
  let formattedOp: string = operator;
  const reg: RegExp = /\s*(!=|==)\s*/;

  if (formattedOp === "=") {
    formattedOp = "==";
  }
  switch (typeof comparedValue) {
    case "string":
      if (reg.test(formattedOp)) {
        res = transformString(comparedValue).includes(transformString(searchedValue));
      }
      if (formattedOp === "!=") {
        return !res;
      }
      return res;
    case "boolean":
      if (reg.test(formattedOp)) {
        return eval(`${comparedValue.toString()} ${formattedOp} ${searchedValue}`);
      }
      return false;
    case "number":
      return eval(
        `${comparedValue} ${formattedOp} ${parseInt(searchedValue.replace(/ /g, ""), 10)}`
      );

    default:
      return res;
  }
};

// Research function when you're not in query mode
type SimpleSearch = {
  columns: Object[],
  value: string,
  rows: Object[]
};

export const simpleSearch = ({ columns, value, rows }: SimpleSearch): Object[] => {
  const resRows: Object[] = [];
  rows.forEach((row: Object) => {
    columns.some(
      ({ id }: { id: string }) =>
        transformString(row[id]).includes(transformString(value)) && resRows.push(row)
    );
  });
  return resRows;
};

// Research query mode with inter
export const querySearchInter = ({ queriesArray, rows }: QueryType): Object[] => {
  let resultsArray: Object[] = [...rows];
  if (queriesArray) {
    queriesArray.forEach((query: string) => {
      const querySplitted: string[] = query.split(/\s*(!==|!=|<=|>=|=|<|>)\s*/);
      if (querySplitted[2]) {
        resultsArray = resultsArray.filter((row: Object) =>
          filterByColNameAndOp({
            comparedValue: row[querySplitted[0].trim()],
            operator: querySplitted[1],
            searchedValue: querySplitted[2]
          })
        );
        if (resultsArray.length === 0) {
          return null;
        }
      }
      return resultsArray;
    });
  }
  return resultsArray;
};

// Manage priorities in query mode
export const managePrioritiesQueries = ({
  queryString,
  rows
}: {
  queryString: string,
  rows: Object[]
}): Object[] => {
  const resRows: Object[] = [];
  const unionSplitted: string[] = queryString.split(/\|\||OR/);
  unionSplitted.forEach(interQuery => {
    const interSplitted: string[] = interQuery.split(/&&|AND/);
    resRows.push(querySearchInter({ queriesArray: interSplitted, rows }));
  });
  return uniq(flatten(resRows));
};
