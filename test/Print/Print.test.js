import "jsdom-global/register";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Print from "../../src/Print";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";

const setRowsData = jest.fn();
const setColumns = jest.fn();
const props = createProps({ setRowsData, setColumns });

describe("Print", () => {
  let wrapper;

  beforeEach(() => {
    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);

    wrapper = mount(
      <O2xpProvider {...props}>
        <Print />
      </O2xpProvider>,
      { attachTo: window.domNode }
    );
  });

  afterEach(() => {
    wrapper.detach();
    wrapper = null;
  });

  afterAll(() => {
    window.open.mockClear();
  });

  it("should mount", () => {
    expect(wrapper.find(Print)).toHaveLength(1);
  });

  it("should handle open", () => {
    act(() => {
      wrapper
        .find(IconButton)
        .at(0)
        .simulate("click");
    });
    wrapper.update();

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

    window.open = jest.fn();
    window.open.mockReturnValue({
      document: {
        close: jest.fn(),
        write: jest.fn()
      },
      focus: jest.fn(),
      close: jest.fn(),
      print: jest.fn()
    });

    wrapper
      .find("#o2xp-all-rows-button")
      .at(0)
      .simulate("click");

    expect(window.open).toBeCalled();
  });
});
