import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostNew extends Component{
  
  renderField(field){
    const inputClassname = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    return(
      <div className={inputClassname}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }
  
  onSubmit(values){
    //console.log(values);    
    //ejecuto ActionCreator
    this.props.createPost(values, () => {
      //navegacion heredada del componente Route que me renderizo
      this.props.history.push('/');
    });
  }

  render(){ 
    const { handleSubmit } = this.props; 

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> 
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field 
          label="Post content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">
            Cancel
        </Link>
      </form>
    )
  }

}

//se ejecuta unicamente cuando SUBMIT FORM (props.handleSubmit)
function validate(values){
  //values es un OBJETO que mantiene los valores de los Fields por cada name, ejemplo: {title:'titulo', categories:'categorias!'}
  const errors = {};

  //validaciones
  if (!values.title || values.title.length < 3){
    errors.title = "Enter a title with at least 3 characters!";
  }
  if (!values.categories){
    errors.categories="Enter some categories!";
  }
  if (!values.content){
    errors.content = "Enter some content!";
  }

  //si errors is empty object --> form OK to submit (no errors)
  //if erros has any properties, redux form assumes form is invalid and NOT SUBMIT
  return errors;

}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost}) (PostNew)
);
