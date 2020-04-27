import React, {Component} from 'react'

import {Link} from 'react-router-dom'

import axios from '../../../axios'

import Post from '../../../components/Post/Post'

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
        this.setState({
            selectedPostId: id
        });
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
                //"to" will take you to the path of the id, meaning it passes the value to the end
            <Link to={'/' + post.id} key={post.id} >
            <Post 
                    title={post.title}
                    author={post.author}
                    //everytime you pass an argument you use arrow function
                    clicked={() => this.postSelectedHandler(post.id)}
            />
            </Link>)
        });
        }


//-------------------------------------------------------------------------------//    

        return(

        <section className="Posts">
            {posts}
        </section>

        );
    }
}

export default Posts; 
