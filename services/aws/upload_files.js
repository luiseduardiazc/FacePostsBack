'use strict';

const AWS = require('aws-sdk');
const config = require('../../config');

const uuid = require('uuid-random');

const randomFileName = (fileName) => {
  const lastIndexOf = fileName.lastIndexOf('.');
  const extension = fileName.slice(lastIndexOf);
  const newFileName = uuid() + extension;
  return newFileName;
};

async function uploadFileAws (file) {
  const s3 = new AWS.S3({
    accessKeyId: config.aws.AWS_KEY_ID,
    secretAccessKey: config.aws.AWS_KEY_SECRET,
    region: 'us-west-2'
  });

  const params = {
    Bucket: config.aws.AWS_BUCKET_NAME,
    Key: randomFileName(file.originalname), // File name you want to save as in S3
    Body: file.buffer
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}

module.exports = {
  uploadFileAws
};
