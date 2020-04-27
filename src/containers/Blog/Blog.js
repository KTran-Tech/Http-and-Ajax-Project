import React, { Component } from 'react';
// axios is necessary to work with promises(usually an Object with LOTS of data)
// import axios from 'axios';
// import axios from '../../axios'

import {Route, NavLink, Switch} from 'react-router-dom'

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
{/* by using the <Switch> wrapper, tells the path="/:id" to only load one Route at a time, else
it would also load the path="/new-post" as well */}
                <Switch>
                    <Route path="/new-post" exact component={NewPost}/>
    {/* Route will CREATE a NEW page after you click on the component {Posts} */}
        {/* path will equal to whatever the paths name is when redirected by {Posts}
        so its best to be careful as it can also be affected by changing it to {NewPost} */}
            {/* in order for FullPost component to be displayed, the path has the be EXACT with the id */}
    {/* ":id" is a flexible parameter that accepts a value in from {Post} and passes it into {FullPost}*/}
                    <Route path="/:id" exact component={FullPost}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;