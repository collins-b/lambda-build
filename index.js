// UPDATED TODAY
var mysql = require('mysql');
var AWS = require('aws-sdk');
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
exports.handler = (event, context, callback) => {
    //var message = event.Records[0].Sns.Message;
    // console.log('Message received from SNS topic:', message);
    connection.query('show slave status;', function (error, results, fields) {
        if (error) {
            connection.destroy();
            throw error;
        } else {
            var secondsBehind =results[0].Seconds_Behind_Master;
            // if (secondsBehind<10){
            //     var sns = new AWS.SNS();

            //     sns.publish({
            //         Message: 'Test publish to SNS from Lambda',
            //         TopicArn: 'topicarn'
            //     }, function(err, data) {
            //         if (err) {
            //             console.log(err.stack);
            //             return;
            //         }
            //         console.log('push sent');
            //         console.log(data);
            //         context.done(null, 'Function Finished!');
            //     });
            // }
            console.log(secondsBehind, "uuuuu")
            callback(error, results);
            connection.end(function (err) { callback(err, results);});
        }
    });
};

// console.log('Loading function');

// var AWS = require('aws-sdk');
// AWS.config.region = 'us-east-1';

// exports.handler = function(event, context) {
//     console.log("\n\nLoading handler\n\n");
//     var sns = new AWS.SNS();

//     sns.publish({
//         Message: 'Test publish to SNS from Lambda',
//         TopicArn: 'arn:aws:sns:us-east-1:281094676178:job-now-slave'
//     }, function(err, data) {
//         if (err) {
//             console.log(err.stack);
//             return;
//         }
//         console.log('push sent');
//         console.log(data);
//         context.done(null, 'Function Finished!');
//     });
// };
