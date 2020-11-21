/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
	app.on('push', async context => {
		const sysInfoUrl = 'https://raw.githubusercontent.com/' + context.payload.repository.full_name + '/' + context.payload.repository.default_branch + '/system-info.yml';
		context.log.info(sysInfoUrl);

		try {
			const data = await context.octokit.repos.getContent({
				method: 'HEAD',
				owner: context.payload.repository.owner.name,
				repo: context.payload.repository.name,
				path: '/system-info.yml'
			});
			context.log.info(data);
			context.log.info(yaml);
			const file = yaml.load(Buffer.from(data.content, 'base64').toString()) || {};
			context.log.info(file);
		} catch (error) {
			if (error.status === 404) {
				context.log.info('file does not exist');
			} else {
				context.log.info('handle connection errors');
			}
		}
	})
}
