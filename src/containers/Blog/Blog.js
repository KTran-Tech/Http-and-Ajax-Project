import React, { Component } from 'react';
// axios is necessary to work with promises(usually an Object with LOTS of data)
// import axios from 'axios';
// import axios from '../../axios'

import {Route, NavLink, Switch} from 'react-router-dom'

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
{/* "exact" means that it has to be that specific path in order to display the component */}
{/* link is technically the same as <a> tags */}
                            <li><NavLink to="/posts/" exact>Posts</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>


{/* by using the <Switch> wrapper, tells the path to only load one Route at a time */}
                <Switch>
                    <Route path="/new-post" exact component={NewPost}/>
                    <Route path="/posts" component={Posts}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;