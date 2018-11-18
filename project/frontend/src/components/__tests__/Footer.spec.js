import React from "react";
import Footer from "../Footer";
import { shallow } from "../../enzyme";

import renderer from "react-test-renderer";

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

describe(">>>Footer --- Snapshot", () => {
  it("+++capturing Snapshot of Footer", () => {
    const renderedValue = renderer.create(<Footer />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
