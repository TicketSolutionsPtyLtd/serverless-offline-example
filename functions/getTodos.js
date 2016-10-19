import db from '../lib/dynamodb'

export const handler = (event, context, callback) => {
    const tableName = 'todos'

    db.scan({
        TableName: tableName
    }).promise().then(result => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        }
        callback(null, response)
    }).catch(err => {
        console.error(`getTodos: ${err}`)
        const response = {
            statusCode: 500
        }
        callback(response)
    })
}

export default handler
