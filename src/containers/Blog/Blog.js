import React, { Component } from 'react';
// axios is necessary to work with promises(usually an Object with LOTS of data)
// import axios from 'axios';
// import axios from '../../axios'

import {Route, NavLink} from 'react-router-dom'

import './Blog.css';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'



class Blog extends Component {



    render () {
    

        return (
            <div className="Blog">

                <header>
                    <nav>
                        <ul>
{/* link is essential because it prevents the page from losing the state and reloading a new page */}
{/* "exact" means that it has to be that specific path in order to display the component */}
{/* link is technically the same as <a> tags */}
                            <li><NavLink to="/" exact>Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

            <Route path="/" exact component={Posts}/>
            <Route path="/new-post"  component={NewPost}/>
            <Route path="/:id" exact component={FullPost}/>

            </div>
        );
    }
}

export default Blog;