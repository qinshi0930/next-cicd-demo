module.exports = {
	apps: [{
		name: 'next-app',
		interpreter: '/usr/bin/pnpm',
		interpreter_args: '',
		script: 'start',
		cwd: '/var/www/next-app',
		instances: 1,
		autorestart: true,
		max_memory_restart: '500M',
		env: {
			NODE_ENV: 'production'
		}
	}]
}