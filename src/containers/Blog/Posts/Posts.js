import React, {Component} from 'react'

// import {Link} from 'react-router-dom'

import axios from '../../../axios'

import {Route} from 'react-router-dom';

import Post from '../../../components/Post/Post'

import FullPost from '../FullPost/FullPost'

import './Posts.css'

class Posts extends Component {

    state = {
        posts: []
    }
//-------------------------------------------------------------------------------//    
    //componentDidMount is the best method to send http request
    componentDidMount(){
        //axios works WITH promises and .get() RETURNS a promise(an object with data)
    /* A promise may be in one of 3 possible states: fulfilled, rejected, or pending.*/
        axios.get('/posts')
            .then(response => {
                //Limit to 4 post only
                const posts = response.data.slice(0,4);
                //modifying the data some more
                const updatedPosts = posts.map(post => {
                 /*for every object(4 in total) create a seperate object
                    for every one of them using the spread operator inside
                    the {}, and hardcode in "author:Max"*/
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                /*setState() is within .then() because it needs time for the axios.get()
                to finish data grabbing */
                this.setState({
                 /*"data" is the PROPERTY of an Object,
                 "data" holds an array of blogs*/
                    posts: updatedPosts
                });
                // console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
           
    }



    postSelectedHandler = (id) => {
    //changes the pathname to the id of the post clicked on    
        this.props.history.push({pathname: '/posts/' + id});
    }
    

//-------------------------------------------------------------------------------//
    render () {    


        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>

        if(!this.state.error){

        /*For every OBJECT that exist within this array, loop throuh them
        individually, one by one, and access their id, title, ect*/
         posts = this.state.posts.map(post => {
            return (
//this entire post will serve as an anchor tag, meaning clicking on it will redirect you        
                //"to" will take you to the path name of the id, meaning it passes the value to the end
            
            // <Link to={'/posts/' + post.id} key={post.id} >
            <Post 
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    //everytime you pass an argument you use arrow function
                    clicked={() => this.postSelectedHandler(post.id)}
            />
            // </Link>
           
            );
        });
        }


//-------------------------------------------------------------------------------//    

        return(
        <div>   
            <section className="Posts">
                {posts}
            </section>
 {/* Route will CREATE a NEW page after you click on the component {Posts} */}
        {/* path will equal to whatever the paths name is when redirected by {Posts}
        so its best to be careful as it can also be affected by changing it to {NewPost} */}
            {/* in order for FullPost component to be displayed, the path has the be EXACT with the id */}
    {/* ":id" is a flexible parameter that accepts a value in from {Post} and passes it into {FullPost}*/}            
            <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
        </div>     
        );
    }
}

export default Posts; 
