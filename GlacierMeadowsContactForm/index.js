'use strict';
const querystring = require('querystring');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_KEY);
module.exports = async function (context, request) {
  let form = typeof request.body === "string";
  let { email, name, message } = form ? querystring.parse(request.body) : request.body;
  // defaults
  let to = "aiverson1011@gmail.com";
  let subject = "New Wedding Inquery";
  let from = email;
  // Simple Template -- move to the server
  let html = '';
  let text = `New Contact\n`;
  text += `Name: ${name}\n`;
  text += `Email: ${email}\n`;
  text += `Message:\n\n`;
  text += message;
  try {
    await sendgrid.send({ to, from, subject, text })
    context.res = {
      status: 200,
      body: true
    }
  } catch (e) {
    context.log(e.response.body);
    context.res = {
      status: 500,
      body: false
    }
  }
};