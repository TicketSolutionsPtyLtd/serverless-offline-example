module.exports = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.ENVIRONMENT_TYPE': JSON.stringify('#{EnvironmentType}'),
    'process.env.ENVIRONMENT_NAME': JSON.stringify('#{EnvironmentName}'),
    'process.env.APPLICATION_NAME': JSON.stringify('#{ApplicationName}'),
    'process.env.APPLICATION_VERSION': JSON.stringify('#{ApplicationVersion}'),
    'process.env.USER_POOL_ID': JSON.stringify('#{UserPoolId}'),
    'process.env.USER_POOL_REGION': JSON.stringify('#{UserPoolRegion}'),
}
