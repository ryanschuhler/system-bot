/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.log.info('Yay, the app was loaded!')

  app.on('push', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!!!' })
    return context.github.issues.createComment(issueComment)
  })
}
