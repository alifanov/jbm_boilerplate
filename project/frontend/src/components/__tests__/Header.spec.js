import React from "react";
import Header, { Header as DummyHeader } from "../Header";
import { shallow, mount } from "../../enzyme";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

import renderer from "react-test-renderer";

const mockStore = configureStore();

const store = mockStore({
  auth: {
    access: { token: "token" },
    refresh: {
      token: "token"
    }
  }
});

describe(">>> Header test", () => {
  let header;
  beforeEach(() => {
    header = shallow(<Header store={store} />);
  });

  it("+++ render Header component", () => {
    expect(header.length).toEqual(1);
  });
  it("+++ check text for Header", () => {
    const header = shallow(<DummyHeader isAuthenticated={false} />);
    expect(header.find("h5").text()).toEqual("Simple blog");
  });
});

describe(">>>Header --- Snapshot", () => {
  it("+++capturing Snapshot of Header", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <Header store={store} />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
