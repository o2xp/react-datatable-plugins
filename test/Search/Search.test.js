import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import Search from "../../src/Search";
import { O2xpProvider } from "../../src/O2xpContext";
import createStore from "../mockStore";

const setRowsDataMock = jest.fn();
const setColumnsMock = jest.fn();
const store = createStore({ setRowsDataMock, setColumnsMock });

describe("Search", () => {
  const wrapper = mount(
    <O2xpProvider {...store}>
      <Search />
    </O2xpProvider>
  );

  it("should mount", () => {
    expect(wrapper.find(Search)).toHaveLength(1);
  });
});
