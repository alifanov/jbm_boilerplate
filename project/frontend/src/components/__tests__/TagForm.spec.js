import React from "react";
import TagForm from "../forms/tag";

import { shallow, mount } from "../../enzyme";
import { MemoryRouter } from "react-router-dom";

import renderer from "react-test-renderer";

describe(">>> TagForm test", () => {
  let form;
  beforeEach(() => {
    form = shallow(<TagForm />);
  });

  it("+++ render component", () => {
    expect(form.length).toEqual(1);
  });
  it("+++ check elements", () => {
    expect(form.find("Form>FormGroup>Input").length).toEqual(1);
    expect(form.find("Form>div>Button").length).toEqual(1);
  });
  it("+++ check add tag name", () => {
    const component = form.dive();
    component
      .find("Form>FormGroup>Input")
      .at(0)
      .simulate("change", { target: { value: "New tag" } });

    expect(form.state().name).toEqual("New tag");
  });
  it("+++ check submit", () => {
    const mockSubmitFn = jest.fn();
    form = shallow(<TagForm onSubmit={mockSubmitFn} />);
    const component = form.dive();
    component
      .find("Form>FormGroup>Input")
      .at(0)
      .simulate("change", { target: { value: "New tag" } });
    component
      .find("Form>div>Button")
      .at(0)
      .simulate("click");

    expect(form.state().name).toEqual("");
    expect(mockSubmitFn.mock.calls.length).toEqual(1);
  });
});

describe(">>>TagForm --- Snapshot", () => {
  it("+++capturing", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <TagForm />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
