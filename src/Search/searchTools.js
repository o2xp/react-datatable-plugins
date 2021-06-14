// @flow
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import type { QueryType } from "./Types/QueryType";

// function which normalize input values
export const transformString = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/ /g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// function which compares data table value with searched value in terms of type and operator
type FilterByColNameAndOp = {
  comparedValue: string | number,
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
  if (formattedOp === "=") {
    formattedOp = "==";
  }
  switch (typeof comparedValue) {
    case "boolean":
      if (formattedOp === "==" || formattedOp === "!=") {
        return eval(`${comparedValue.toString()} ${formattedOp} ${searchedValue}`);
      }
    case "number":
      return eval(
        `${comparedValue} ${formattedOp} ${parseInt(searchedValue.replace(/ /g, ""))}`
      );
    case "string":
      if (formattedOp === "==" || formattedOp === "!=") {
        // const res = transformString(comparedValue) === transformString(searchedValue);
        res = transformString(comparedValue).includes(transformString(searchedValue));
      }
      if (formattedOp === "!=") {
        return !res;
      }
      return res;
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
        filterByColNameAndOp({
          comparedValue: row[id].toString(),
          operator: "=",
          searchedValue: value.toString()
        }) && resRows.push(row)
    );
  });
  return resRows;
};

// Manage priorities in query mode
export const managePrioritiesQueries = ({
  queriesArray,
  rows
}: {
  queriesArray: string,
  rows: Object[]
}): Object[] => {
  const resRows: Object[] = [];
  const unionSplitted: string[] = queriesArray.split(/\|\||OR/);
  unionSplitted.forEach(interQuery => {
    const interSplitted: string[] = interQuery.split(/&&|AND/);
    resRows.push(querySearchInter({ queriesArray: interSplitted, rows }));
  });
  return uniq(flatten(resRows));
};

// Research query mode with union
export const querySearchUnion = ({ queriesArray, rows }: QueryType): Object[] => {
  const resultsArray: Object[] = [];
  console.log({ queriesArray, rows });
  queriesArray.forEach((query: string) => {
    const querySplitted: string[] = query.split(/\s*(!=|<=|>=|=|<|>)\s*/);
    if (querySplitted[2]) {
      rows.filter(row => {
        {
          filterByColNameAndOp({
            comparedValue: row[querySplitted[0].trim()],
            operator: querySplitted[1],
            searchedValue: querySplitted[2]
          }) && resultsArray.push(row);
        }
      });
    }
  });
  return uniq(resultsArray);
};

// Research query mode with inter
export const querySearchInter = ({ queriesArray, rows }: QueryType): Object[] => {
  let resultsArray: Object[] = [...rows];
  if (queriesArray) {
    queriesArray.forEach((query: string) => {
      const querySplitted: string[] = query.split(/\s*(!==|!=|<=|>=|=|<|>)\s*/);
      if (querySplitted[2]) {
        resultsArray = resultsArray.filter(row =>
          filterByColNameAndOp({
            comparedValue: row[querySplitted[0].trim()],
            operator: querySplitted[1],
            searchedValue: querySplitted[2]
          })
        );
        if (resultsArray.length === 0) {
        }
      }
    });
  }
  return resultsArray;
};
