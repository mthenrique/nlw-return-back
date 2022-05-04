import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "169e004f4f83a4",
    pass: "be55345b199bad"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Mateus Oliveira <mthenriqueo@gmail.com>',
      subject,
      html: body
    })
  };

}