import React, { Component } from 'react';
// axios is necessary to work with promises(usually an Object with LOTS of data)
import axios from 'axios';


import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }


//-------------------------------------------------------------------------------//    
    //componentDidMount is the best method to send http request
    componentDidMount(){
        //axios works WITH promises and .get() RETURNS a promise(an object with data)
    /* A promise may be in one of 3 possible states: fulfilled, rejected, or pending.*/
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
                this.setState({error: true});
            });
           
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
            return <Post 
                    key={post.id} 
                    title={post.title}
                    author={post.author}
                    //everytime you pass an argument you use arrow function
                    clicked={() => this.postSelectedHandler(post.id)}
                    />
        });
        }

        return (
            <div>

                <section className="Posts">
                    {posts}
                </section>

                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>

                <section>
                    <NewPost />
                </section>

            </div>
        );
    }
}

export default Blog;