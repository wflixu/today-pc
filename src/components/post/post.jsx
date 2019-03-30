import React from "react";
import './index.css';
import logo from '../../assets/logo.png';

export default class Post extends React.Component {
    constructor(){
        super(arguments);
    }
    render() {
        const {post} = this.props
        return (
            <div className="post">
                <div className="avatar lf">
                    <img src={logo} alt="" />
                </div>
                <div className="post_content lf">
                    <div className="post_header">
                        <a href="#">{post.user_name}</a>
                        <a href="#"> follow</a>
                    </div>
                    <div className="post_body">
                        <p>{post.post_content.text}</p>
                    </div>
                    <div className="post_footer">
                        <div className="post_footer_left lf">
                            <span>{post.love_num}</span>
                            <span>notes</span>
                        </div>
                        <div className="post_footer_right rf">
                            <span>love</span>
                            <span>comment</span>
                            <span>share</span>
                        </div>
                    </div>
                </div>
                <div className="clear">

                </div>
            </div>
        )
    }
}