import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Export from "../../../src/Download/Export";
import { O2xpProvider } from "../../../src/O2xpContext";
import createProps from "../../mockProps";

const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();
const setShowDialogMock = jest.fn();
const props = createProps({ setRowsDataMock, setColumnsMock });

describe("Export", () => {
  let wrapper;

  beforeEach(() => {
    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);

    wrapper = mount(
      <O2xpProvider {...props}>
        <Export showDialog setShowDialog={setShowDialogMock} />
      </O2xpProvider>,
      { attachTo: window.domNode }
    );
  });

  afterEach(() => {
    wrapper.detach();
    wrapper = null;
  });

  it("should mount", () => {
    expect(wrapper.find(Export)).toHaveLength(1);
  });

  it("should call setShowDialog", () => {
    wrapper
      .find(Dialog)
      .props()
      .onClose();

    expect(setShowDialogMock).toHaveBeenCalledWith(false);
  });

  it("should change file type", () => {
    act(() => {
      wrapper
        .find(RadioGroup)
        .props()
        .onChange({ target: { value: "json" } });
    });
    wrapper.update();

    expect(
      wrapper
        .find(FormControlLabel)
        .at(1)
        .find("input")
        .props()
    ).toBeTruthy();
  });

  it("should change file name", () => {
    act(() => {
      wrapper
        .find(TextField)
        .first()
        .props()
        .onChange({ target: { value: "testFileName" } });
    });
    wrapper.update();

    expect(
      wrapper
        .find(TextField)
        .first()
        .props().value
    ).toEqual("testFileName");
  });

  it("should handleClick", () => {
    act(() => {
      wrapper
        .find(TextField)
        .first()
        .props()
        .onChange({ target: { value: "testFileName" } });
    });
    wrapper.update();

    expect(
      wrapper
        .find(TextField)
        .first()
        .props().value
    ).toEqual("testFileName");

    act(() => {
      wrapper
        .find("a")
        .props()
        .onClick();
    });
    wrapper.update();

    console.log(wrapper.find("a").props());
  });
});
