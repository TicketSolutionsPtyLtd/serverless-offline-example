import db from '../lib/dynamodb'

export const handler = (event, context, callback) => {
    const item = JSON.parse(event.body)
    const tableName = 'todos'

    db.update({
        TableName: tableName,
        Key: {
            todoId: item.todoId
        },
        UpdateExpression: 'set description = :description',
        ExpressionAttributeValues: {':description': item.description}
    }).promise().then(() => {
        const response = {
            statusCode: 200
        }
        callback(null, response)
    }).catch(err => {
        console.error(`updateTodo: ${err}`)
        const response = {
            statusCode: 500
        }
        callback(response)
    })
}

export default handler
