import React, { Component } from 'react';
// axios is necessary to work with promises(usually an Object with LOTS of data)
// import axios from 'axios';
// import axios from '../../axios'

import {Route, NavLink, Switch, Redirect} from 'react-router-dom'

import './Blog.css';

import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent'

//import NewPost from './NewPost/NewPost'
/* "()=>" is the function passed through as importComponent(), and 
'./NewPost/NewPost' will be the component that set the state to its default component*/
const AsyncNewPost = asyncComponent(()=> {
    return import('./NewPost/NewPost');
});


class Blog extends Component {

    state = {
        auth:true
    }


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
    {/* when the page is redirected to "/new-post" {AsyncNewPost} will be invoked */}
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost}/> : null }
                    
                    <Route path="/posts" component={Posts}/>


                    {/*a great way of handling 404*/}
                    <Route render={() => <h1>Not Found</h1>}/>

                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;