import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import DisplayColumns from "../../src/DisplayColumns";
import { columnsData } from "../../static/data";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import { MenuItem } from "@material-ui/core";
import mockStore from "../../static/mockStore";

const dispatchMock = jest.fn();
const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();

const props = createProps({ setRowsDataMock, setColumnsMock });

const contextMock = {
  state: mockStore,
  dispatch: payload => dispatchMock(payload)
};

const useO2xpProviderMock = () => contextMock;

jest.mock("../../src/hooks/useO2xpProvider", () => useO2xpProviderMock);

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

      const opened = wrapper.find("#o2xp-customized-menu").first();
      const test = opened.get(0).props.open;

      expect(test).toBeTruthy();
    });

    it("should handleClose", () => {
      const openClick = wrapper.find(IconButton).first();
      openClick.simulate("click");
      let menuWrapper = wrapper.find("#o2xp-customized-menu").first();

      act(() => {
        menuWrapper.props().onClose();
      });
      wrapper.update();
      menuWrapper = wrapper.find("#o2xp-customized-menu").first();

      expect(menuWrapper.props().open).toBeFalsy();
    });
  });

  describe("setColumnVisibility condition", () => {
    it("should filter", () => {
      const openClick = wrapper.find(IconButton).first();
      openClick.simulate("click");
      const opened = wrapper.find("#o2xp-customized-menu").first();
      const test = opened.get(0).props.open;

      expect(test).toBeTruthy();

      const temp = wrapper.find(".o2xp-menu-item-age").first();
      temp.simulate("click");

      const action = {
        type: "SET_COLUMNS",
        payload: {
          data: {
            ...columnsData,
            columnsOrder: ["index", "id", "name", "birthdate", "eyecolor", "iban"]
          }
        }
      };
      expect(dispatchMock).toHaveBeenCalledWith(action);
    });

    it("should splice", () => {
      const openClick = wrapper.find(IconButton).first();
      openClick.simulate("click");
      const opened = wrapper.find("#o2xp-customized-menu").first();
      const test = opened.get(0).props.open;

      expect(test).toBeTruthy();

      const temp = wrapper.find(".o2xp-menu-item-eyecolor").first();
      temp.simulate("click");

      const action = {
        type: "SET_COLUMNS",
        payload: {
          data: {
            ...columnsData,
            columnsOrder: ["index", "id", "name", "birthdate", "eyecolor", "iban"]
          }
        }
      };

      expect(dispatchMock).toHaveBeenCalledWith(action);
    });
  });
});
