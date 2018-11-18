import React from "react";
import Header from "../Header";
import { shallow, mount } from "../../enzyme";
import { MemoryRouter } from "react-router-dom";

import renderer from "react-test-renderer";

describe(">>> Header test", () => {
  let header;
  beforeEach(() => {
    header = shallow(<Header />);
  });

  it("+++ render Header component", () => {
    expect(header.length).toEqual(1);
  });
  it("+++ check text for Header", () => {
    expect(header.find("div>h5").text()).toEqual("Simple blog");
  });
});

describe(">>>Header --- Snapshot", () => {
  it("+++capturing Snapshot of Header", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
