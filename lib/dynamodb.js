import { DynamoDB } from 'aws-sdk'

const options = {
    region: "ap-southeast-2",
    endpoint: "http://localhost:8000/"
}

const isOffline = () => process.env.IS_OFFLINE

var client = isOffline()
    ? new DynamoDB.DocumentClient(options)
    : new DynamoDB.DocumentClient()

export default client