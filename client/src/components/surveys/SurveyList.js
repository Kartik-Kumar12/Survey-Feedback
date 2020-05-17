import React,{Component} from "react";
import * as actions from "../../actions";
import {connect} from "react-redux";

class SurveyList extends Component{
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys(){

   return  this.props.surveys.map(survey => {
       return   ( <div className="card blue-grey darken-1"key = {survey.title}>
                     <div className = "card-content white-text">
                       <span className = "card-title">{survey.title}</span>
                       <p>{survey.body}</p>
                     </div>
                     <div className = "card-action">
                         <button className ="btn"style={{"marginRight" : "20px"}}>Yes : {survey.yes}</button>
                         <button className ="btn">No : {survey.no}</button>
                         <button className ="btn right">Last response: { new Date(survey.lastResponded).toLocaleDateString()}</button>
                         <button className ="btn right"style={{"marginRight" : "20px"}}>Sent On: { new Date(survey.dateSent).toLocaleDateString()}</button>
                     </div>
                 </div> )
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}
function mapStateToProps({surveys}){
   return {surveys};
}
export default connect(mapStateToProps,actions)(SurveyList);
