var urlencode = require('urlencode')

module.exports = {
    siteUrl: process.env.AUTH0_BASE_URL || 'https://researcherp.com',
    generateRobotsTxt: true, // (optional),
    exclude: ['/admin/*'],
    transform: async (config, path) => {
        return {
            loc: urlencode(path.substring(1)), // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: config.changefreq,
            priority: config.priority,
        }
    }
    // ...other options
  }