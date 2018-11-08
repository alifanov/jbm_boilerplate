import React from "react";
import Header from "../header";
import { shallow, mount } from "../../enzyme";

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
