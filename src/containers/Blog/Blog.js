import React, { Component } from 'react';
// axios is necessary to work with promises(usually an Object with LOTS of data)
// import axios from 'axios';
// import axios from '../../axios'

import {Route, Link} from 'react-router-dom'

import './Blog.css';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'



class Blog extends Component {



    render () {
    

        return (
            <div className="Blog">

                <header>
                    <nav>
                        <ul>
{/* link is essential because it prevents the page from losing the state and reloading a new page */}
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/new-post">New Post</Link></li>
                        </ul>
                    </nav>
                </header>

            <Route path="/" exact component={Posts}/>
            <Route path="/new-post" exact component={NewPost}/>


            </div>
        );
    }
}

export default Blog;