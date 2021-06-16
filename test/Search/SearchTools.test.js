import "jsdom-global/register";
import { filterByColNameAndOp, querySearchInter } from "../../src/Search/searchTools";

describe("Search", () => {
  describe("filterByColNameAndOp should", () => {
    it("return true result with boolean test", () => {
      expect(
        filterByColNameAndOp({
          comparedValue: true,
          operator: "=",
          searchedValue: "true"
        })
      ).toBeTruthy();
    });

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
});
