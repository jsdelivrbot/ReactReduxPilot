import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class PostNew extends Component{
  
  renderField(field){
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {field.meta.error}
      </div>
    );
  }
  
  onSubmit(values){
    console.log(values);
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
      </form>
    )
  }

}

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

  //si errors is empty --> form OK to submit (no errors)
  return errors;

}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostNew);
