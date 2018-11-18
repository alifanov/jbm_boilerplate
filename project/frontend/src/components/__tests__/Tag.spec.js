import React from "react";
import Tag from "../Tag";

import { shallow, mount } from "../../enzyme";
import { MemoryRouter } from "react-router-dom";

import renderer from "react-test-renderer";

describe(">>> Tag test", () => {
  let tag;
  beforeEach(() => {
    tag = shallow(<Tag name="Tag1" />);
  });

  it("+++ render Tag component", () => {
    expect(tag.length).toEqual(1);
  });
  it("+++ check text for Tag", () => {
    expect(
      tag
        .find("Button")
        .at(0)
        .props().children
    ).toEqual("Tag1");
  });
  it("+++ check for delete Tag", () => {
    const mockDeleteFn = jest.fn();
    const tag = shallow(<Tag name="Tag1" onDelete={mockDeleteFn} />);
    const component = tag.dive();
    component
      .find("Button")
      .at(1)
      .simulate("click");

    expect(mockDeleteFn.mock.calls.length).toEqual(1);
  });
});

describe(">>>Tag --- Snapshot", () => {
  it("+++capturing Snapshot of Tag", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <Tag name="Tag" />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
