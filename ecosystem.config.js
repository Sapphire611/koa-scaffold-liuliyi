module.exports = {
	apps: {
		name: 'koa-scaffhold-liuliyi',
		script: './dist/bundle.js',
		instances: 1,
		instance_var: 'INSTANCE_ID',
		autorestart: true,
		max_restarts: 10,
		restartDelay: 3000,
		watch: false,
		ignore_watch: ['node_modules', 'uploads', 'logs'],
		max_memory_restart: '10G',
		env: {
			DEBUG: 'app*',
			NODE_ENV: 'production',
			NODE_CONFIG_DIR: '/etc/s365/backend'
		}
	}
};
