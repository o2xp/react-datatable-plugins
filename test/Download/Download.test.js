import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Download from "../../src/Download";
import Button from "../../src/Download/Button";
import Export from "../../src/Download/Export";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";

const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();
const props = createProps({ setRowsDataMock, setColumnsMock });

describe("Download", () => {
  let wrapper = mount(
    <O2xpProvider {...props}>
      <Download />
    </O2xpProvider>
  );

  beforeEach(() => {
    wrapper = mount(
      <O2xpProvider {...props}>
        <Download />
      </O2xpProvider>
    );
  });

  afterEach(() => {
    wrapper = null;
  });

  it("should mount", () => {
    expect(wrapper.find(Download)).toHaveLength(1);
  });

  it("should open dialog", () => {
    act(() => {
      wrapper
        .find(Button)
        .props()
        .open();
    });
    wrapper.update();

    expect(wrapper.find(Export).props().showDialog).toBeTruthy();
  });
});
