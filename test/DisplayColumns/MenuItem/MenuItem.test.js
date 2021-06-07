import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import MenuItem from "../../../src/DisplayColumns/MenuItem";
import { columnsData } from "../../../static/data";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItemMUI from "@material-ui/core/MenuItem";

const { columns, columnsOrder } = columnsData;
const column = columns.id;
const handleClick = jest.fn();

const props = { column, columnsOrder, handleClick };

describe("MenuItem", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<MenuItem {...props} />);
  });

  afterEach(() => {
    handleClick.mockClear();
    wrapper = null;
  });

  it("should mount", () => {
    expect(wrapper.find(MenuItem)).toHaveLength(1);
  });

  it("should handleClick", () => {
    const button = wrapper.find(MenuItemMUI);
    button.simulate("click");
    expect(handleClick).toHaveBeenCalledWith(column.id);
  });

  describe("Checkbox should be", () => {
    it("checked", () => {
      expect(wrapper.find(Checkbox).props().checked).toBeTruthy();
    });

    it("unchecked", () => {
      const uncheckedWrapper = mount(<MenuItem {...props} columnsOrder={["name"]} />);
      expect(uncheckedWrapper.find(Checkbox).props().checked).toBeFalsy();
    });
  });
});
