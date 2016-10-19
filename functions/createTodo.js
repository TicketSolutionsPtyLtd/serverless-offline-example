import db from '../lib/dynamodb'

export const handler = (event, context, callback) => {
    const todo = JSON.parse(event.body)

    const params = {
        TableName: 'todos',
        Item: {
            "todoId": todo.todoId,
            "description": todo.description,
            "completedAt": todo.completedAt,
        }
    }

    db.put(params).promise().then(result => {
        const response = {
            statusCode: 200
        }
        callback(null, response)
    }).catch(err => {
        console.error(`createTodo: ${err}`)
        const response = {
            statusCode: 500
        }
        callback(response)
    })
}

export default handler
