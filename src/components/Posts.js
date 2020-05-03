import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'; // connect react component to redux store that was provided by provider component
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {  no need for the component state
    //         posts: []   because the posts is gonna come from redux or the application state or the store
    //     }
    // }

    // componentWillMount() {
    //     fetch("https://jsonplaceholder.typicode.com/posts")
    //         .then(res => res.json())
    //         .then(data => this.setState({ posts: data }));
    // }

    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost); // add to beginning, shift remove from beginning
        }
    }

    render() {
        const postItems = this.props.posts.map(post =>
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        );
        return (
            <div>
                <h2>Posts</h2>
                {postItems}
            </div>
        )
    }
}
//props validation
Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapStateToProps = state => ({
    posts: state.posts.items,  //state.posts same as exist in rootReducer (contains combined reducers)
    newPost: state.posts.item
})

//export default Posts;
export default connect(mapStateToProps, { fetchPosts })(Posts); // call fetch action, place component will mount
// first parameter mapStateToProps