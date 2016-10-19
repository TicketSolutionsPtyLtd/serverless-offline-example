import db from '../lib/dynamodb'

export const handler = (event, context, callback) => {
    const params = event.pathParameters || {}
    const tableName = 'todos'

    db.query({
        TableName: tableName,
        KeyConditionExpression: '#todoId = :todoId',
        ExpressionAttributeValues: {
            ':todoId': params.todoId
        },
        ExpressionAttributeNames: {
            '#todoId': 'todoId'
        }
    }).promise().then(result => {
        let body = undefined
        if (result.Items.length > 0) {
            body = JSON.stringify(result.Items[0])
        }

        const response = {
            statusCode: 200,
            body,
        }
        callback(null, response)
    }).catch(err => {
        console.error(`getTodo: ${err}`)
        const response = {
            statusCode: 500
        }
        callback(response)
    })
}

export default handler