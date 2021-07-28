import "jsdom-global/register";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import Search from "../../src/Search";
import { O2xpProvider } from "../../src/O2xpContext";
import createProps from "../mockProps";
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

describe("Search", () => {
  let wrapper = mount(
    <O2xpProvider {...props}>
      <Search />
    </O2xpProvider>
  );

  beforeEach(() => {
    wrapper = mount(
      <O2xpProvider {...props}>
        <Search />
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
    act(() => {
      searchIcon.props().onClick();
    });
    wrapper.update();
    const formControlLabel = wrapper.find(FormControlLabel).first();

    expect(formControlLabel.props().className).toEqual("o2xp-search-mode-hidden");
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

  describe(" bar should be open and query mode", () => {
    it("should be in simple mode and dispatch", () => {
      searchIcon.simulate("click");
      const formControlLabel = wrapper.find(FormControlLabel).first();

      expect(formControlLabel.props().className).toEqual("o2xp-search-mode-hidden");
      expect(wrapper.exists("#o2xp-search-bar")).toBeTruthy();

      act(() => {
        wrapper
          .find("#o2xp-search-bar")
          .first()
          .props()
          .onChange({ target: { value: "h" } });
      });
      wrapper.update();

      const action = {
        type: "SET_DATA",
        payload: {
          rowsData: [
            {
              id: "5f96a92dee57be1eafd26821",
              index: 0,
              adult: true,
              age: 1,
              eyecolor: "brown",
              name: "Osborne Johns",
              iban: "osbornejohns@terrasys.com",
              birthdate: "1996-07-09T10:38:46 -00:00"
            },
            {
              id: "5f96a92d8550e90247230961",
              index: 1,
              adult: true,
              age: 60,
              eyecolor: "brown",
              name: "Hess Nixon",
              iban: "hessnixon@terrasys.com",
              birthdate: "1964-12-05T09:35:11 -00:00"
            }
          ]
        }
      };
      expect(dispatchMock).toHaveBeenCalledWith(action);
    });

    it("should be in query mode and dispatch", () => {
      searchIcon.simulate("click");
      const formControlLabel = wrapper.find(FormControlLabel).first();

      expect(formControlLabel.props().className).toEqual("o2xp-search-mode-hidden");
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

      act(() => {
        wrapper
          .find("#o2xp-search-bar")
          .first()
          .props()
          .onChange({ target: { value: "name = osborne" } });
      });
      wrapper.update();

      const action = {
        type: "SET_DATA",
        payload: {
          rowsData: [
            {
              id: "5f96a92dee57be1eafd26821",
              index: 0,
              adult: true,
              age: 1,
              eyecolor: "brown",
              name: "Osborne Johns",
              iban: "osbornejohns@terrasys.com",
              birthdate: "1996-07-09T10:38:46 -00:00"
            }
          ]
        }
      };
      expect(dispatchMock).toHaveBeenCalledWith(action);
    });
  });

  it("should print error", () => {
    searchIcon.simulate("click");
    const formControlLabel = wrapper.find(FormControlLabel).first();

    expect(formControlLabel.props().className).toEqual("o2xp-search-mode-hidden");
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

    act(() => {
      wrapper
        .find("#o2xp-search-bar")
        .first()
        .props()
        .onChange({ target: { value: "name " } });
    });
    wrapper.update();

    expect(
      wrapper
        .find("#o2xp-search-bar")
        .first()
        .props().error
    ).toBeTruthy();
  });
});
