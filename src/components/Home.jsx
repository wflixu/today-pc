import React from "react";

import Post from './post/post.jsx';
import PostsData from '../assets/data/posts.json'; 

export default class Home extends React.Component {
    constructor(){
        super(arguments);
        this.state = {
            posts:PostsData
        }
    }
    render() {
        const {posts} = this.state;
        return (
            <div className="column_left">
                <div className="posts">{
                  posts.map(post=>{return <Post post={post} />})
                } 
                </div>
            </div>
        )
    }
}