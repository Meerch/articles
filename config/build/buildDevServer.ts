import { BuildOptions } from './types/config'
import { Configuration as ConfigurationDevServer } from 'webpack-dev-server'

export function buildDevServer (options: BuildOptions): ConfigurationDevServer {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true
    }
}