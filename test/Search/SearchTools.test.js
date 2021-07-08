import "jsdom-global/register";
import {
  filterByColNameAndOp,
  querySearchInter,
  evaluateQuery,
  transformString,
  managePrioritiesQueries
} from "../../src/Search/SearchSystem/searchTools";

describe("SearchSystem", () => {
  describe("managePrioritiesQueries should", () => {
    it("return corresponding row", () => {
      expect(
        managePrioritiesQueries({
          queryString: "age = 1",
          rows: [
            {
              id: "5f96a92dee57be1eafd26821",
              index: 0,
              adult: false,
              age: 1,
              eyecolor: "brown",
              name: "Osborne Johns",
              iban: "osbornejohns@terrasys.com",
              birthdate: "1996-07-09T10:38:46 -00:00"
            },
            {
              id: "5f96a92d8550e90247230961",
              index: 1,
              adult: true,
              age: 60,
              eyecolor: "brown",
              name: "Hess Nixon",
              iban: "hessnixon@terrasys.com",
              birthdate: "1964-12-05T09:35:11 -00:00"
            },
            {
              id: "5f96a92dfe5aa509332917df",
              index: 2,
              adult: true,
              age: 36,
              eyecolor: "brown",
              name: "Bentley Carter",
              iban: "bentleycarter@terrasys.com",
              birthdate: "2019-04-04T04:59:29 -00:00"
            },
            {
              id: "5f96a92d905258369b3f3927",
              index: 3,
              adult: true,
              age: 37,
              eyecolor: "brown",
              name: "Estes Lamb",
              iban: "esteslamb@terrasys.com",
              birthdate: "2015-09-05T06:50:42 -00:00"
            }
          ]
        })
      ).toEqual([
        {
          adult: false,
          age: 1,
          birthdate: "1996-07-09T10:38:46 -00:00",
          eyecolor: "brown",
          iban: "osbornejohns@terrasys.com",
          id: "5f96a92dee57be1eafd26821",
          index: 0,
          name: "Osborne Johns"
        }
      ]);
    });
  });

  describe("transformString should", () => {
    it("return formatted string equivalent", () => {
      expect(transformString("O Sb Orné")).toEqual("osborne");
    });
    it("return string equivalent for boolean", () => {
      expect(transformString(true)).toEqual("true");
    });
    it("return string equivalent for number", () => {
      expect(transformString(14)).toEqual("14");
    });
  });

  describe("filterByColNameAndOp should", () => {
    it("break and return default case", () => {
      expect(
        filterByColNameAndOp({
          comparedValue: true,
          operator: ">",
          searchedValue: "true"
        })
      ).toBeFalsy();
    });

    it("return true result with number test", () => {
      expect(
        filterByColNameAndOp({
          comparedValue: 1,
          operator: "=",
          searchedValue: "1"
        })
      ).toBeTruthy();
    });

    it("return default case", () => {
      expect(
        filterByColNameAndOp({
          comparedValue: { value: {} },
          operator: "=",
          searchedValue: ""
        })
      ).toBeFalsy();
    });

    describe("return with boolean test ", () => {
      it("true using = operator", () => {
        expect(
          filterByColNameAndOp({
            comparedValue: true,
            operator: "=",
            searchedValue: "true"
          })
        ).toBeTruthy();
      });

      it("true using != operator", () => {
        expect(
          filterByColNameAndOp({
            comparedValue: false,
            operator: "!=",
            searchedValue: "true"
          })
        ).toBeTruthy();
      });
    });

    describe("return with string test ", () => {
      it("true using = operator", () => {
        expect(
          filterByColNameAndOp({
            comparedValue: "Osborne johns",
            operator: "=",
            searchedValue: "jo"
          })
        ).toBeTruthy();
      });

      it("true using != operator", () => {
        expect(
          filterByColNameAndOp({
            comparedValue: "Osborne johns",
            operator: "!=",
            searchedValue: "k"
          })
        ).toBeTruthy();
      });
    });

    describe("querySearchInter function should", () => {
      it("return null", () => {
        expect(
          querySearchInter({
            queriesArray: ["age = 1"],
            rows: [
              {
                id: "5f96a92d8550e90247230961",
                index: 1,
                adult: true,
                age: 60,
                eyecolor: "brown",
                name: "Hess Nixon",
                iban: "hessnixon@terrasys.com",
                birthdate: "1964-12-05T09:35:11 -00:00"
              }
            ]
          })
        ).toEqual([]);
      });
    });
  });

  describe("evaluateQuery should", () => {
    it("return default", () => {
      expect(
        evaluateQuery({ comparedValue: 1, operator: "&", searchedValue: 14 })
      ).toBeFalsy();
    });
    describe("with !=", () => {
      it("return true", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: "!=", searchedValue: 14 })
        ).toBeTruthy();
      });
      it("return false", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: "!=", searchedValue: 1 })
        ).toBeFalsy();
      });
    });

    describe("with <", () => {
      it("return true", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: "<", searchedValue: 14 })
        ).toBeTruthy();
      });
      it("return false", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: "<", searchedValue: 0 })
        ).toBeFalsy();
      });
    });

    describe("with <=", () => {
      it("return true", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: "<=", searchedValue: 14 || 1 })
        ).toBeTruthy();
      });
      it("return false", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: "<=", searchedValue: 0 })
        ).toBeFalsy();
      });
    });

    describe("with >", () => {
      it("return true", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: ">", searchedValue: 0 })
        ).toBeTruthy();
      });
      it("return false", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: ">", searchedValue: 1 })
        ).toBeFalsy();
      });
    });

    describe("with >=", () => {
      it("return true", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: ">=", searchedValue: 0 })
        ).toBeTruthy();
      });
      it("return false", () => {
        expect(
          evaluateQuery({ comparedValue: 1, operator: ">=", searchedValue: 4 || 1 })
        ).toBeFalsy();
      });
    });
  });
});
