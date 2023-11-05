import * as nodemailer from 'nodemailer';
import { IMail } from './Mail.interface';
import appConfig from '../../../config/index.interface';
export class Mail implements IMail {
	sendRegistrationEmail(): Promise<void> {
		throw new Error('Method not implemented.');
	}

	private static async sendMail(
		to: string,
		sub: string,
		html: string,
	): Promise<void> {
		const transporter = nodemailer.createTransport({
			host: appConfig.email.host,
			port: appConfig.email.port,
			secure: appConfig.email.secure, // true for 465, false for other ports
			auth: {
				user: appConfig.email.auth.user, // generated ethereal user
				pass: appConfig.email.auth.pass, // generated ethereal password
			},
		});
		// send mail with defined transport object
		await transporter.sendMail({
			from: appConfig.email.fromEmail, // sender address
			to: to, // list of receivers
			subject: sub, // Subject line
			html: html, // html body
		});
	}
}
