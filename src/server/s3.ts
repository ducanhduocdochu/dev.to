'use strict'

import { env } from "@/env"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3Config = {
    region: 'ap-southeast-2', 
    endpoint: `https://ap-southeast-2.console.aws.amazon.com/s3/buckets/dev.to-upload-file`, 
    credentials: {
        accessKeyId: env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: env.AWS_BUCKET_SECRET_KEY,
    }
}

const s3 = new S3Client(s3Config)

export { s3, PutObjectCommand }
