import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Post from '../../components/post';
import PostForm from '../../components/form';

import React, {Component} from 'react';

import {getPosts, addPost} from '../../actions/posts';

import './index.css';

class PostList extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <div>
                <PostForm onSubmit={(title, text) => this.props.addPost(title, text)}/>
                {this.props.posts.map((p, i) => <Post key={i} content={p}/>)}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getPosts: getPosts,
    addPost: addPost
}, dispatch);

const mapStateToProps = (state) => ({
    posts: state.posts
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);