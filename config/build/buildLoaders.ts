import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = buildSvgLoader()

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

    const cssLoader = buildCssLoader(options.isDev)

    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader
    ]
}