import React from "react";
import PostForm from "../forms/Post";

import { shallow, mount } from "../../enzyme";
import { MemoryRouter } from "react-router-dom";

import renderer from "react-test-renderer";

describe(">>> PostForm test", () => {
  let form;
  beforeEach(() => {
    form = shallow(<PostForm />);
  });

  it("+++ render component", () => {
    expect(form.length).toEqual(1);
  });
  it("+++ check elements", () => {
    expect(form.find("Form>FormGroup>Input").length).toEqual(2);
    expect(form.find("Form>div>Button").length).toEqual(1);
  });
  it("+++ check add text", () => {
    const component = form.dive();
    component
      .find("Form>FormGroup>Input")
      .at(0)
      .simulate("change", { target: { value: "New title" } });
    component
      .find("Form>FormGroup>Input")
      .at(1)
      .simulate("change", { target: { value: "New text" } });

    expect(form.state().title).toEqual("New title");
    expect(form.state().text).toEqual("New text");
  });
  it("+++ check show/hide", () => {
    expect(form.state().show).toEqual(false);
    const component = form.dive();
    component
      .find("a")
      .at(0)
      .simulate("click");

    expect(form.state().show).toEqual(true);
  });
  it("+++ check submit", () => {
    const mockSubmitFn = jest.fn();
    form = shallow(<PostForm onSubmit={mockSubmitFn} />);
    const component = form.dive();
    component
      .find("Form>FormGroup>Input")
      .at(0)
      .simulate("change", { target: { value: "New title" } });
    component
      .find("Form>FormGroup>Input")
      .at(1)
      .simulate("change", { target: { value: "New text" } });

    component
      .find("Form>div>Button")
      .at(0)
      .simulate("click");

    expect(form.state().title).toEqual("");
    expect(form.state().text).toEqual("");
    expect(mockSubmitFn.mock.calls.length).toEqual(1);
  });
});

describe(">>>PostForm --- Snapshot", () => {
  it("+++capturing", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <PostForm />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
