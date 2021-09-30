const webpack = require('webpack');
const getModuleData = require('./utils/module-data');

module.exports = ({ prod }) => {
    process.env.NODE_ENV = prod ? 'production' : 'development'
    process.env.ENTRY = getModuleData().entryPoint

    const config = require('@tri-tolstiaka/webpack-config');

    webpack(config, (err, stats) => {
        if (err) {
            return;
        }
    })
}