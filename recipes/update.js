'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.update = (event, context, callback) => {
	const timestamp = new Date().getTime()
	const data = JSON.parse(event.body)
	if(typeof data.text !== 'string' || typeof data.checked !== 'boolean'){
		console.error('Validation Failed')
		callback(new Error('Couldn\'t create the recipe item.'))
		return
	}
	const obj = {
		TableName: 'recipes',
		Item: {
			id: event.pathParameters.id,
			recipe: data.text
		}

	}
	dynamoDb.put(obj, (error, result) =>{
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