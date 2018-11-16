import React from "react";
import Posts, { PostList } from "../posts";
import configureStore from "redux-mock-store";
import { shallow } from "../../enzyme";
import { MemoryRouter } from "react-router-dom";

import renderer from "react-test-renderer";

describe(">>>POSTS --- test smart component/page", () => {
  const initialState = { postsReducer: { posts: ["1", "2", "3"] } };
  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Posts store={store} />);
  });

  it("+++ render component", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("+++ posts in prop", () => {
    expect(wrapper.props().posts).toEqual(initialState.postsReducer.posts);
  });

  it("+++ check dummy", () => {
    const dummy = shallow(
      <PostList
        filters={{ from: null, to: null, q: null }}
        posts={[{ title: "1", text: "11" }, { title: "2", text: "22" }]}
        postsCounter={1}
        getPosts={() => null}
        wsConnect={() => null}
      />
    );
    expect(dummy.find("Post").length).toEqual(2);
  });
});

describe(">>>Posts --- Snapshot", () => {
  it("+++capturing", () => {
    const renderedValue = renderer
      .create(
        <MemoryRouter>
          <PostList
            filters={{ from: null, to: null, q: null }}
            posts={[{ title: "1", text: "11" }, { title: "2", text: "22" }]}
            postsCounter={1}
            getPosts={() => null}
            wsConnect={() => null}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
