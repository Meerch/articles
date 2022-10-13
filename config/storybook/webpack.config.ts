import webpack, { RuleSetRule } from 'webpack'
import { BuildPaths } from '../build/types/config'
import path from 'path'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { buildSvgLoader } from '../build/loaders/buildSvgLoader'

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        src: '',
        entry: path.resolve(__dirname, '..', '..', 'src')
    }

    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        if ((rule.test as string).includes('svg')) {
            return {
                ...rule,
                exclude: /\.svg/i
            }
        }
        return rule
    })
    config.module.rules.push(buildCssLoader(true))
    config.module.rules.push(buildSvgLoader())

    config.resolve.modules.push(paths.entry)
    config.resolve.extensions.push('.ts', '.tsx')

    return config
}
