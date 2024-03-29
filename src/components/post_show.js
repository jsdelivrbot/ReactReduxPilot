import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost, deletePost} from '../actions';

class PostShow extends Component {
  componentDidMount(){
    const idPost = this.props.match.params.idPost;
    this.props.fetchPost(idPost);
  }

  onDeleteClick(){
    //ActionCreator
    const idPost = this.props.match.params.idPost;

    this.props.deletePost(idPost, () => {
      this.props.history.push('/');
    });
  }

  render(){
    const {post} = this.props;

    if (!post){
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
        Delete
        </button>
        <h3>{post.title}</h3>
        <h5>Categories: {post.categories}</h5>
        <p>{post.content}</p>
      </div>
    )

  }
}

function mapStateToProps({posts}, ownProps){
  //solo mapeo el post que necesito en vez de traer todos los post y luego tener que buscarlo para renderizar
  //ownProps es el this.props actual, me permite utilizar las props del componente dentro de esta funcion
  return {post: posts[ownProps.match.params.idPost]};
}

export default connect (mapStateToProps, {fetchPost, deletePost}) (PostShow);