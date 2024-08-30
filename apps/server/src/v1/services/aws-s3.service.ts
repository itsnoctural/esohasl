import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: Bun.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: Bun.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: Bun.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadWithUrl(url: string, path: string) {
  const image = await fetch(url);
  return await upload(await image.arrayBuffer(), `${path}`);
}

export async function uploadWithFile(file: File, path: string) {
  return upload(await file.arrayBuffer(), `${path}`);
}

async function upload(arrayBuffer: ArrayBuffer, path: string) {
  return await client.send(
    new PutObjectCommand({
      Bucket: Bun.env.AWS_S3_BUCKET,
      Body: arrayBuffer as unknown as Buffer,
      Key: path,
    }),
  );
}

export async function deleteFile(folder: string, name: string) {
  return await client.send(
    new DeleteObjectCommand({
      Bucket: Bun.env.AWS_S3_BUCKET,
      Key: `${folder}/${name}`,
    }),
  );
}
