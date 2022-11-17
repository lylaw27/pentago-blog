var urlencode = require('urlencode')

const urlshortener = (path) =>{
    let result;
    if(path.length>2){
        result = urlencode(path).substring(3)
    }
    else{
        result = path
    }
    return result
}

module.exports = {
    siteUrl: process.env.AUTH0_BASE_URL || 'https://researcherp.com',
    generateRobotsTxt: true, // (optional),
    exclude: ['/admin/*','/admin','/login'],
    transform: async (config, path) => {
        return {
            loc: urlshortener(path), // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: config.changefreq,
            priority: config.priority,
        }
    },
    // ...other options
  }