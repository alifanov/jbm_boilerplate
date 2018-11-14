import React from "react";
import { View, Text } from "react-native";
import { shallow } from "../../enzyme";
import Post from "../post";

import renderer from "react-test-renderer";

describe(">>> Post test", () => {
  it("+++ render Post component", () => {
    const post = shallow(<Post title={"Title"} text={"Text"} />);
    expect(post.length).toEqual(1);
  });
  it("+++ check text for Post", () => {
    const post = shallow(<Post title={"Title"} text={"Text"} />);
    expect(
      post
        .find(Text)
        .at(0)
        .props().children
    ).toEqual("Title");
    expect(
      post
        .find(Text)
        .at(1)
        .props().children
    ).toEqual("Text");
  });
});

describe(">>>Post --- Snapshot", () => {
  it("+++capturing Snapshot of Post", () => {
    const renderedValue = renderer
      .create(<Post title={"Title"} text={"Text"} />)
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
