const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const nodePaths = (process.env.NODE_PATH || '')
    .split(process.platform === 'win32' ? ';' : ':')
    .filter(Boolean)
    .map(resolveApp);

module.exports = {
    appBuild: resolveApp('.webpack'),
    appFunctions: resolveApp('functions'),
    appPackageJson: resolveApp('package.json'),
    appNodeModules: resolveApp('node_modules'),
    nodePaths: nodePaths
}