import db from '../lib/dynamodb'

export const handler = (event, context, callback) => {
    const params = event.pathParameters || {}
    const tableName = 'todos'

    db.delete({
        TableName: tableName,
        Key: {
            todoId: params.todoId
        }
    }).promise().then(() => {
        const response = {
            statusCode: 200,
        }
        callback(null, response)
    }).catch(err => {
        console.error(`removeTodo: ${err}`)
        const response = {
            statusCode: 500
        }
        callback(response)
    })
}

export default handler
