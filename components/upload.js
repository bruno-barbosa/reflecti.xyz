
'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const s3 = new AWS.S3();

const bucketName = process.env.AWS_BUCKET;
const urlBase = process.env.AWS_URL_BASE;

exports.s3 = (file, cb) => {
  if(!file.mimetype.match(/image/)) {
    return cb({error: 'File must be image'});
  }

  const filenameParts = file.originalname.split('.');

  let ext;
  if(filenameParts.length > 1) {
    ext = '.' + filenameParts.pop();
  } else {
    ext = '';
  }

  let key = uuid() + `${ext}`;

  let params = {
    Bucket: bucketName,
    Key: key,
    ACL: 'public-read',
    Body: file.buffer,
  };

  s3.putObject(params, (err, result) => {
    console.log(err);
    if(err) return cb(err);

    let imgUrl = `${urlBase}${bucketName}/${key}`;
    cb(null, imgUrl);
  });
};
