/* move lambda to AWS Lambda

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'FormEntries';

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const { email, message } = body;

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Email is required.' }),
        };
    }

    try {
        // Check if the email already exists in the database
        const existingEntry = await dynamoDB
            .get({
                TableName: TABLE_NAME,
                Key: { email },
            })
            .promise();

        if (existingEntry.Item) {
            // If the email exists, update it
            await dynamoDB
                .update({
                    TableName: TABLE_NAME,
                    Key: { email },
                    UpdateExpression: 'set message = :message',
                    ExpressionAttributeValues: {
                        ':message': message,
                    },
                })
                .promise();

            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: 'Entry updated successfully.' }),
            };
        } else {
            // If the email does not exist, create a new entry
            await dynamoDB
                .put({
                    TableName: TABLE_NAME,
                    Item: { email, message },
                })
                .promise();

            return {
                statusCode: 201,
                body: JSON.stringify({ success: true, message: 'Entry created successfully.' }),
            };
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'An error occurred.' }),
        };
    }
};
*/