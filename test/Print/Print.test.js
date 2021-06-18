import "jsdom-global/register";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Print from "../../src/Print";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";

const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();
const props = createProps({ setRowsDataMock, setColumnsMock });
window.open = jest.fn();
jest.useFakeTimers();

describe("Print", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <O2xpProvider {...props}>
        <Print />
      </O2xpProvider>
    );
  });

  afterAll(() => {
    wrapper = null;
  });

  it("should mount", () => {
    expect(wrapper.find(Print)).toHaveLength(1);
  });

  it("should handle open", () => {
    wrapper
      .find(IconButton)
      .at(0)
      .simulate("click");

    expect(wrapper.find(Dialog).props().open).toBeTruthy();
  });

  it("should handle close", () => {
    wrapper
      .find(IconButton)
      .at(0)
      .simulate("click");

    expect(wrapper.find(Dialog).props().open).toBeTruthy();

    act(() => {
      wrapper
        .find(Dialog)
        .at(0)
        .props()
        .onClose();
    });
    wrapper.update();

    expect(
      wrapper
        .find(Dialog)
        .first()
        .props().open
    ).toBeFalsy();
  });

  it("should handle change", () => {
    wrapper
      .find(IconButton)
      .at(0)
      .simulate("click");

    expect(wrapper.find(Dialog).props().open).toBeTruthy();

    act(() => {
      wrapper
        .find(".o2xp-checkbox")
        .at(0)
        .props()
        .onChange();
    });
    wrapper.update();

    expect(
      wrapper
        .find(".o2xp-checkbox")
        .at(0)
        .props().checked
    ).toBeFalsy();
  });

  it("open print tab", () => {
    wrapper
      .find(IconButton)
      .at(0)
      .simulate("click");

    expect(wrapper.find(Dialog).props().open).toBeTruthy();

    wrapper
      .find("#o2xp-all-rows-button")
      .at(0)
      .simulate("click");

    const closeSpy = jest.fn();
    window.open = jest.fn().mockReturnValue({ close: closeSpy });
    window.close = jest.fn();

    expect(window.open).toBeCalled();

    jest.runAllTimer();

    expect(closeSpy).toBeCalled();
  });
});
