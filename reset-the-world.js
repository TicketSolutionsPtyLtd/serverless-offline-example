import AWS from 'aws-sdk'
import BbPromise from 'bluebird'

AWS.config.setPromisesDependency(BbPromise);

const options = {
    region: 'ap-southeast-2',
    endpoint: 'http://localhost:8000/'
}

const createTodoTable = () => {
    const db = new AWS.DynamoDB(options)
    const params = {
        TableName : 'todos',
        KeySchema: [
            { AttributeName: 'todoId', KeyType: 'HASH'}
        ],
        AttributeDefinitions: [
            { AttributeName: 'todoId', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        }
    }

    return db.createTable(params).promise()
}

const seedTodosTable = () => {
    const db = new AWS.DynamoDB.DocumentClient(options)

    const todos = [{
        'todoId': 'c796d733-9779-45c5-a130-20fd1fd0b652',
        'description': '4 eggs',
    }, {
        'todoId': '43fca9c6-91f4-4593-9e5c-fac85beab5a7',
        'description': '1 avocado',
    }, {
        'todoId': '42828c93-afb5-4761-ba55-becfda40b11b',
        'description': '2 slices of bread',
    }]

    return BbPromise.all(todos.map(todo => db.put({TableName: 'todos', Item: todo}).promise()))
}

createTodoTable()
    .then(seedTodosTable)
    .then(data => console.log('Created tables and seeded initial data'))
    .catch(err => console.error(JSON.stringify(err)))