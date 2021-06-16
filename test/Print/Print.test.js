import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import Print from "../../src/Print";
import O2xpProvider from "../../src/O2xpContext";
import createProps from "../mockProps";

const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();
const props = createProps({ setRowsDataMock, setColumnsMock });

describe("Print", () => {
  let wrapper = mount(
    <O2xpProvider {...props}>
      <Print />
    </O2xpProvider>
  );

  it("should mount", () => {
    expect(wrapper.find(Print)).toHaveLength(1);
  });
});
