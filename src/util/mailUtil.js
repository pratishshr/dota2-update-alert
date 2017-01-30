/**
 * @author Pratish Shrestha <pratishshrestha@lftechnology.com>
 */

import nodemailer from 'nodemailer';

/**
 * {
 *  from:'"NAME" <noreply@email.com>'
 *  to: 'test@test.com,
 *  service: 'gmail',
 *  auth: {
 *     user: username,
 *     pass: password
 *   },
 * subject: 'This is a test subject',
 * htmlContent: '<h1> Html content </h1>'
 * }
 * @param options
 */
export function sendMail(options) {
  var transporter = nodemailer.createTransport({
    service: options.service,
    auth: options.auth
  });
  
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
      }
      resolve('Message sent: ' + info.response);
    });
  })
}

