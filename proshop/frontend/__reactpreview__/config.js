module.exports = {
    svgr: {
        componentName: "default",
    },
};
// reactpreview.config.js
const webpackConfig = require('./webpack.aliases');

module.exports = {
    alias: webpackConfig.resolve.alias,
};
module.exports = {
    publicDir: "dist",
};