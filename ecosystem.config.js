module.exports = {
	apps: [
		{
			name: 'phillysbestpizzaBackend', // specify your app name
			script: 'npm',
			args: 'run start',
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
