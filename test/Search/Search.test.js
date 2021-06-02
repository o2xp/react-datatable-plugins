import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import Search from "../../src/Search";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";

const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();
const props = createProps({ setRowsDataMock, setColumnsMock });

describe("Search", () => {
  const wrapper = mount(
    <O2xpProvider {...props}>
      <Search />
    </O2xpProvider>
  );

  it("should mount", () => {
    expect(wrapper.find(Search)).toHaveLength(1);
  });
});
