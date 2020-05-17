import React,{Component} from "react";
import {Link} from "react-router-dom"
import { reduxForm , Field} from "redux-form";
import SurveyField from "./SurveyField";
import fields from './FIELDS';
import validateEmails from './validateEmails'

class SurveyForm extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <form onSubmit = {this.props.handleSubmit(this.props.onFormSubmit)}>
             { fields.map( ({label,name}) => {
                 return (
                        <Field
                          key ={name}
                          name = {name}
                          component = {SurveyField}
                          type = "text"
                          label = {label}
                        />
                      )
              }) }
              <Link to ="/surveys"className="btn left">Cancel
                <i className="material-icons left">arrow_back</i>
              </Link>
              <button className="btn right" type="submit">Next
                <i className="material-icons right">arrow_forward</i>
              </button>
        </form>
      </div>
    );
  }
}
// Here values are form's input by the user gets automatically passed to form for  validation
function validate(values){
  console.log("VALUES",values);
  const errors ={};
  errors.recipients = validateEmails(values.recipients || "");
  fields.forEach(({name}) => {
    if( !values[name])
      errors[name]="You must provide "+name+" field";
  });
  return errors;
}
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount : false
})(SurveyForm);
