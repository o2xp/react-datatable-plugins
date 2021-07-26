import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import Pagination from "../../src/Pagination";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";

const handleNavMock = jest.fn();
const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();
const props = createProps({ setRowsDataMock, setColumnsMock });

describe("Pagination", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <O2xpProvider {...props}>
        <Pagination />
      </O2xpProvider>
    );
  });

  afterEach(() => {
    wrapper = null;
  });

  it("should mount", () => {
    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  it("should change target value", () => {
    act(() => {
      wrapper
        .find(Select)
        .at(0)
        .props()
        .onChange({ target: { value: 2 } });
    });
    wrapper.update();

    expect(
      wrapper
        .find("#o2xp-simple-select")
        .at(0)
        .props().value
    ).toEqual(2);
  });

  it("should change target value", () => {
    act(() => {
      wrapper
        .find(Select)
        .at(0)
        .props()
        .onChange({ target: { value: 2 } });
    });
    wrapper.update();

    act(() => {
      wrapper
        .find(Select)
        .at(1)
        .props()
        .onChange({ target: { value: 2 } });
    });
    wrapper.update();

    expect(
      wrapper
        .find("#o2xp-simple-select")
        .at(1)
        .props().value
    ).toEqual(2);
  });

  it("should decrement target value", () => {
    act(() => {
      wrapper
        .find(Select)
        .at(0)
        .props()
        .onChange({ target: { value: 2 } });
    });
    wrapper.update();

    wrapper
      .find(IconButton)
      .at(1)
      .simulate("click");

    expect(
      wrapper
        .find("#o2xp-simple-select")
        .at(1)
        .props().value
    ).toEqual(2);

    wrapper
      .find(IconButton)
      .at(0)
      .simulate("click");

    expect(
      wrapper
        .find("#o2xp-simple-select")
        .at(0)
        .props().value
    ).toEqual(2);

    expect(handleNavMock).toHaveBeenCalledTimes(2);
  });
});
