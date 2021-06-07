import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import DisplayColumns from "../../src/DisplayColumns";
import { columnsData } from "../../static/data";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import { MenuItem } from "@material-ui/core";

const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();

const props = createProps({ setRowsDataMock, setColumnsMock });

describe("DisplayColumns", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <O2xpProvider {...props}>
        <DisplayColumns />
      </O2xpProvider>
    );
  });

  afterEach(() => {
    wrapper = null;
  });

  it("should mount", () => {
    expect(wrapper.find(DisplayColumns)).toHaveLength(1);
  });

  describe("Events", () => {
    it("should handleClick", () => {
      const temp = wrapper.find(IconButton).first();
      temp.simulate("click");

      const opened = wrapper.find("#customized-menu").first();
      const test = opened.get(0).props.open;

      expect(test).toBeTruthy();
    });

    it("should handleClose", () => {
      const openClick = wrapper.find(IconButton).first();
      openClick.simulate("click");

      const closeClick = wrapper.find("#close-test").first();
      closeClick.simulate("click");

      const opened = wrapper.find("#customized-menu").first();
      const test = opened.get(0).props.open;

      expect(test).toBeFalsy();
    });
  });

  describe("setColumnVisibility condition", () => {
    it("should filter", () => {});
    it("should splice", () => {});
  });
});
