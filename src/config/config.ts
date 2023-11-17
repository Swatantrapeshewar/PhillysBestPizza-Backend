export default {
	app: {
		frontend: {
			baseUrl: 'http://localhost:5000',
			accountSetup: '/accountSetip',
		},
		backend: {
			baseUrl: 'http://localhost:3001',
		},
	},
	email: {
		host: 'smtp.gmail.com',
		port: 587,
		fromEmail: 'choudharyanan0@gmail.com',
		secure: false,
		auth: {
			user: 'choudharyanan0@gmail.com',
			pass: 'nalpoiaqxpwjlqvm',
		},
		logger: true,
	},
	jwtSecretKey: 'PhillyBestPizza',
};
