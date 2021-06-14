import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Search from "../../src/Search";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import mockStore from "../../static/mockStore";

const dispatchMock = jest.fn();
const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();
const props = createProps({ setRowsDataMock, setColumnsMock });

const useO2xpProviderMock = () => contextMock;

jest.mock("../../src/hooks/useO2xpProvider", () => useO2xpProviderMock);

describe("Search", () => {
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

  const searchIcon = wrapper.find(".o2xp-search-icon").first();

  it("should mount", () => {
    expect(wrapper.find(Search)).toHaveLength(1);
  });

  it("should handleClick", () => {
    searchIcon.simulate("click");
    const searchBar = wrapper.find("#o2xp-search-bar").first();

    expect((searchBar.props().className = "o2xp-open-state")).toBeTruthy();
  });

  it("should swap query mode", () => {
    searchIcon.simulate("click");
    const formControlLabel = wrapper.find(FormControlLabel).first();

    expect(formControlLabel.props().className).toEqual("o2xp-search-mode-show");
    expect(wrapper.exists("#o2xp-search-bar")).toBeTruthy();

    act(() => {
      wrapper
        .find(".o2xp-query-selector")
        .first()
        .props()
        .onClick();
    });
    wrapper.update();
    expect(wrapper.exists("#o2xp-autocomplete")).toBeTruthy();
  });

  it("should be in query mode and dispatch", () => {
    searchIcon.simulate("click");
    const formControlLabel = wrapper.find(FormControlLabel).first();

    expect(formControlLabel.props().className).toEqual("o2xp-search-mode-show");
    expect(wrapper.exists("#o2xp-search-bar")).toBeTruthy();

    act(() => {
      wrapper
        .find(".o2xp-query-selector")
        .first()
        .props()
        .onClick();
    });
    wrapper.update();
    expect(wrapper.exists("#o2xp-autocomplete")).toBeTruthy();

    console.log(wrapper.find("#o2xp-search-bar"));

    const action = {
      type: "SET_DATA",
      payload: {
        rowsData: {}
      }
    };
    expect(dispatchMock).toHaveBeenCalledWith(action);
  });

  it("should print error", () => {
    searchIcon.simulate("click");
    const formControlLabel = wrapper.find(FormControlLabel).first();

    expect(formControlLabel.props().className).toEqual("o2xp-search-mode-show");
    expect(wrapper.exists("#o2xp-search-bar")).toBeTruthy();

    act(() => {
      wrapper
        .find(".o2xp-query-selector")
        .first()
        .props()
        .onClick();
    });
    wrapper.update();
    expect(wrapper.exists("#o2xp-autocomplete")).toBeTruthy();
  });
});
