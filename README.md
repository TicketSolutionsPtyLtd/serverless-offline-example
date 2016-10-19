# serverless-offline-example

## Webpack bundler
 - `npm run build`

## Start service locally
  - `npm run start`
 
## Automation
  - `npm run start-the-world` starts dynamodb
  - `npm run reset-the-world` restarts and seeds dynamodb
  - `npm run stop-the-world` stops and removes dynamodb

## Deploying to AWS
  - `npm run deploy -- --noDeploy` 
  - `npm run deploy -- --stage {stage} --profile {profile}` 
