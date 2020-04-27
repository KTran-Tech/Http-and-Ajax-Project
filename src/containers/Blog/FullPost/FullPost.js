import React, { Component } from 'react';

// axios is necessary to work with promises(usually an Object with LOTS of data)
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

//--------------------------------------------------------------------//
    //componentDidUpdate/Mount is best method to update http request data
    componentDidMount() {
        //"params" means "parameters" passed through 
        if(this.props.match.params.id){
            /*if the current state has data and its id is not the same
            as the props.id, then update*/
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)){

            /* specifying which object to grab from an array and output
            ONLY that object by adding the params at the end*/
            axios.get('/posts/'+this.props.match.params.id)
                .then(response => {
                /*Because of the id specification from the .get(), you go
                from this,
                Object { data:[…,100]} -------> Object { data: {…} }*/
                this.setState({loadedPost: response.data});
            }) 


            }
        }
    }

    deletePostHandler = () => {
        //delete an object with that specific id
        axios.delete('/posts/'+this.props.match.params.id)
            .then(response => {
                console.log(response);
            })
    }
//--------------------------------------------------------------------//


    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        
        if(this.props.match.params.id){
            post = <p style={{textAlign:'center'}}>Loading...!</p>;
        }

        if(this.state.loadedPost) {

            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;


    }

}

export default FullPost;