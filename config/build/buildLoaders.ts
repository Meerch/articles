import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from './types/config'
import {buildCssLoader} from "./loaders/buildCssLoader";
import {buildSvgLoader} from "./loaders/buildSvgLoader";

export function buildLoaders ({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = buildSvgLoader()

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }

    const cssLoader = buildCssLoader(isDev)

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader
    ]
}