import React from "react";
import Post from "../Post";
import Moment from "react-moment";

import { shallow, mount } from "../../enzyme";
import { MemoryRouter } from "react-router-dom";

import renderer from "react-test-renderer";

describe(">>> Post test", () => {
  let post;
  const content = { title: "Title1", text: "Text1" };
  beforeEach(() => {
    post = shallow(<Post content={content} />);
  });

  it("+++ render Post component", () => {
    expect(post.length).toEqual(1);
  });
  it("+++ check text for Post", () => {
    expect(
      post
        .find("CardHeader>div")
        .at(0)
        .props().children
    ).toEqual("Title1");
  });
  it("+++ check for delete Post", () => {
    const mockDeleteFn = jest.fn();
    const post = shallow(<Post content={content} onDelete={mockDeleteFn} />);
    const component = post.dive();
    component
      .find("CardHeader>FaTimesCircle")
      .at(0)
      .simulate("click");

    expect(mockDeleteFn.mock.calls.length).toEqual(1);
  });
});

describe(">>>Post --- Snapshot", () => {
  it("+++capturing Snapshot of Post", () => {
    const content = {
      title: "Title1",
      text: "Text1",
      created_at: new Date(2018, 1, 1, 11, 11, 11, 11)
    };
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <Post content={content} />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
