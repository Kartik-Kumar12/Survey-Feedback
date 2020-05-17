import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import * as actions from "../../actions";
import fields from "./FIELDS";
const SurveyReview = ({makeSurvey,onCancel, values,history}) => {

  const reviewFormField = fields.map( ({label,name}) => {
    return (
          <div key = {name}>
            <label>{label}</label>
            <h6>{values[name]}</h6>
           </div>
       )
   });

  return <div>
           <h5>Please confirm your entries</h5>
           { reviewFormField}
           <button className = "btn left" onClick = {onCancel}>Back
             <i className="material-icons left">arrow_back</i>
           </button>
           <button onClick={ () => makeSurvey(values,history)} className = "btn right">Submit
             <i className="material-icons left">done</i>
           </button>
         </div>
}
function mapStateToProps(state){
  return state.form.surveyForm;
}
export default connect(mapStateToProps,actions)(withRouter(SurveyReview));
