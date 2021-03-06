'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.get = (event, context, callback) => {
	const obj = {
		TableName: 'recipes',
		Key: {
			id: event.pathParameters.id
		}
	}
	dynamoDb.get(obj, (error, result) =>{
		if(error){
			console.error(error)
			callback(null, { statusCode: 400, body: JSON.stringify(error) })
			return
		}
		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		}
		callback(null, response)
	})
}