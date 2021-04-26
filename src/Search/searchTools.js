export const transformString = str => {
  return str
    .toUpperCase()
    .replace(/ /g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const compareOperator = ({ str, op, str2: includedStr }) => {
  if (op === "=") {
    op = "==";
  }
  switch (typeof str) {
    case "boolean":
      return eval(`${str.toString()} ${op} ${includedStr}`);
    case "number":
      return eval(`${str} ${op} ${parseInt(includedStr.replace(/ /g, ""))}`);
    case "string":
      if (op === "==") {
        return transformString(str).includes(transformString(includedStr));
      }
      if (op === "!=") {
        return !transformString(str).includes(transformString(includedStr));
      }
      return false;
    default:
      return false;
  }
};

export const operatorChoice = (op, el, vs) => {
  const str = el[transformString(vs[0])];
  const str2 = vs[2];
  const payload = { str, str2, op };
  switch (op) {
    case "=":
      return compareOperator(payload);
    case "<":
      return compareOperator(payload);
    case ">":
      return compareOperator(payload);
    case "<=":
      return compareOperator(payload);
    case ">=":
      return compareOperator(payload);
    case "!=":
      return compareOperator(payload);
    default:
      return compareOperator(payload);
  }
};
