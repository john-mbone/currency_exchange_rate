const axios = require('axios')
const aws = require('aws-sdk')
const db = new aws.DynamoDB.DocumentClient({ region: 'us-east-2' })

exports.handler = (event, context, callback) => {
    const url = 'https://api.bitfinex.com/v1/pubticker/btcusd'

    axios.get(url).then((response) => {
        var data = response.data
        const params = {
            TableName: 'crypto_currency_exchange',
            Item: data
        }

        saveRequest(params);

        data = JSON.stringify((data))
        callback(null, { "statusCode": 200, "body": data })
    })
};


function saveRequest(payload) {
    return db.put(payload).promise();
}



