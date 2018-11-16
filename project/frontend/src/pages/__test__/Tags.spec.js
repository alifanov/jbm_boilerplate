import React from "react";
import Tags, { TagList } from "../tags";
import configureStore from "redux-mock-store";
import { shallow } from "../../enzyme";
import { MemoryRouter } from "react-router-dom";

import renderer from "react-test-renderer";

describe(">>>TAGS --- test smart component/page", () => {
  const initialState = { tagsReducer: { tags: ["1", "2", "3"] } };
  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Tags store={store} />);
  });

  it("+++ render component", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("+++ tags in prop", () => {
    expect(wrapper.props().tags).toEqual(initialState.tagsReducer.tags);
  });

  it("+++ check dummy", () => {
    const dummy = shallow(
      <TagList
        tags={[{ name: "1" }, { name: "2" }]}
        tagsCounter={1}
        getTags={() => null}
        wsConnect={() => null}
      />
    );
    expect(dummy.find("Tag").length).toEqual(2);
  });
});

describe(">>>Tags --- Snapshot", () => {
  it("+++capturing", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <TagList
            tags={[{ name: "1" }, { name: "2" }]}
            tagsCounter={1}
            getTags={() => null}
            wsConnect={() => null}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
