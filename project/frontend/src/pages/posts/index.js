import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Post from '../../components/post';

import React, {Component} from 'react';

import {getPosts} from '../../actions/posts';

class PostList extends Component {
    componentDidMount() {
        this.props._getPosts();
    }

    render() {
        return (
            <div>
                {this.props.posts.map((p, i) => <Post key={i} content={p}/>)}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    _getPosts: getPosts
}, dispatch);

const mapStateToProps = (state) => ({
    posts: state.posts
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);