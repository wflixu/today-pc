import React from "react";
import { Link } from 'react-router-dom';
import './index.css';

export default class Nav extends React.Component {
    render() {
        return (<header>
            <div className="header-logo">
                <a href="#" className="">
                    <img src="assets/logo.png" alt="" />
                </a>
            </div>
            <div className="header-nav">
                <Link className="header-nav-home" to="/"></Link> 
                <Link className="header-nav-user" to="/user"></Link>
            </div>
        </header>
        )
    }
}