/**
 * @author Pratish Shrestha <pratishshrestha@lftechnology.com>
 */

import nodemailer from 'nodemailer';
import ses from 'nodemailer-ses-transport';

/**
 * {
 *  accessKey: 'SES accessKEY',
 *  secretKey: 'SES secretKEY',
 *  from:'"NAME" <noreply@email.com>'
 *  to: 'test@test.com,
 *  subject: 'This is a test subject',
 *  htmlContent: '<h1> Html content </h1>'
 * }
 * @param options
 */
export function sendMail(options) {
  var transporter = nodemailer.createTransport(ses({
    accessKeyId: options.accessKey,
    secretAccessKey: options.secretKey
  }));

  var mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.htmlContent
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        reject(error);
        return;
      }
      
      resolve('Message sent');
    });
  })
}

