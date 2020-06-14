'use strict'

const AWS = require('aws-sdk');
const config = require('../../config') 

async function uploadFileAws(file) {

    const s3 = new AWS.S3({
        accessKeyId: config.aws.AWS_KEY_ID,
        secretAccessKey: config.aws.AWS_KEY_SECRET,
        region: 'us-west-2'
    });
    
    const params = {
        Bucket: config.aws.AWS_BUCKET_NAME,
        Key: file.originalname, // File name you want to save as in S3
        Body: file.buffer
    };


    const data =  await s3.upload(params).promise()
    return data.Location
}

module.exports = {
    uploadFileAws
}