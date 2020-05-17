import React,{ Component }from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payment extends Component {

  render(){
    return <StripeCheckout
              name = "SurFey"
              description = "Pay Rs 250 for 5 surveys credits"
              amount ={25000}
              token = { token => this.props.handleToken(token) }
              stripeKey = { process.env.REACT_APP_STRIPE_KEY }
             >
            <button className="btn">ADD CREDITS</button>
           </StripeCheckout>
  }
}
export default connect(null,actions)(Payment) ;
