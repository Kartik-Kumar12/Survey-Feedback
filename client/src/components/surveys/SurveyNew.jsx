import React,{Component} from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";
class SurveyNew extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = { formReview : false};
  //   console.log(this.state);
  // }
  state = { formReview : false};   // Equivalent to constructor codes //

  render(){

    return (
      <div>
        { this.state.formReview ?
              <SurveyReview onCancel = { () => this.setState({ formReview : false })}/> :
              <SurveyForm onFormSubmit = { () => this.setState({ formReview : true}) } />
        }
      </div>
    );
  }
}

export default reduxForm({
  form : 'surveyForm'
})(SurveyNew);
