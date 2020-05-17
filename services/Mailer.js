const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');


class sendEmail {
  constructor( {subject,recipients} ,content){
    sgMail.setApiKey(keys.sendGridKey);
    this.msg = {
      to: this.formatEmail(recipients),
      from: {
        email: 'kartiksaurya05072001@gmail.com',
        name: 'Kartik Saurya'
      },
      replyTo: 'noreplysurveyfeed@gmail.com',
      subject: subject,
      html: content,
      trackingSettings: {
        clickTracking: {
          enable: true
        },
      },
    };
  }
  formatEmail(recipients) {
      return recipients.map( ({ email }) => {
         return email;
          });
    };
  async sendRequest(){
     await sgMail.sendMultiple(this.msg)
  }
}
module.exports = sendEmail;
