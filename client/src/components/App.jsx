import React,{Component} from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import {connect} from 'react-redux';
import * as actions from '../actions';

const Dashboard  = () => <h3>Dashboard </h3>;
const SurveyNew  = () => <h3>SurveyNew </h3>;


class App extends Component{
 componentDidMount(){
    this.props.fetchUser();
 }
  render(){
    return (
          <div className = 'container'>
             <BrowserRouter>
                       <Header />
                       <Route exact path='/' component={Landing} />
                       <Route exact path='/surveys' component={Dashboard} />
                       <Route path='/surveys/new' component={SurveyNew} />
             </BrowserRouter>
          </div>
           )
         }
}

export default connect(null,actions)(App);
