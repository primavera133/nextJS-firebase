const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
module.exports = {
	distDir: "../../dist/functions/next",
	webpack: (config) => {
		config.plugins.push(
			new webpack.EnvironmentPlugin(localEnv)
		)
		return config
	}
}