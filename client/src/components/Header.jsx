import React , {Component}from 'react';
import {connect} from 'react-redux';
import Payment from './Payment';

class Header extends Component {

  renderNavbar(){
    switch(this.props.auth){
      case null : return ;

      case false : return (
                          <ul id="nav-mobile" className="right hide-on-med-and-down">
                           <li><a href="/auth/google">Login with Google</a></li>
                           <li><a href="collapsible.html">Contact Us</a></li>
                          </ul>
                       );

     default :   return (  <ul id="nav-mobile" className="right hide-on-med-and-down">
                                 <li>Hello {this.props.auth.name}</li>
                                 <li style={{ margin : "0 10px"}}><button className="btn">CREDITS: {this.props.auth.credits}</button></li>
                                 <li><Payment/></li>
                                 <li style={{ margin : "0 10px"}}><a href="/api/logout"><button className="btn">LOGOUT</button></a></li>
                              </ul>
                          );
    }
  }

  render(){

    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">SurFey</a>
           { this.renderNavbar() }
        </div>
    </nav>
    );
  }
}
function mapStateToProps({auth}){
  return {auth};
}
export default connect(mapStateToProps)(Header) ;
