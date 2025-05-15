import { BadRequestException, Injectable } from '@nestjs/common';
import { PutObjectAclCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: "us-east-2",
        credentials : {
            accessKeyId: process.env.ACCESSKEY_BUCKET || '',
            secretAccessKey : process.env.SECRETKEY_BUCKET || '',
        }
    })

    async uploadFile(file: Express.Multer.File){
       
        const key = file.originalname;
        const url = `https://nest-ocso-project-test-bucket.s3.us-east-2.amazonaws.com/${key}`;
        const bucket = "nest-ocso-project-test-bucket";
        const command = new PutObjectCommand({
            Key: key,
            Body : file.buffer,
            Bucket : bucket,
        })
    
        const response = await this.s3.send(command);
        if(response.$metadata.httpStatusCode == 200){
            return url;
    }
        //console.log(response);
        //return response;
    }

}
