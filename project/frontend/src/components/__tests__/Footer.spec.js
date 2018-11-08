import React from "react";
import Footer from "../footer";
import { shallow } from "../../enzyme";

describe(">>> Footer test", () => {
  let footer;
  beforeEach(() => {
    footer = shallow(<Footer />);
  });

  it("+++ render Footer component", () => {
    expect(footer.length).toEqual(1);
  });
  it("+++ check text for Footer", () => {
    expect(
      footer
        .find("div>p")
        .at(1)
        .text()
    ).toEqual("Blog example");
  });
});
