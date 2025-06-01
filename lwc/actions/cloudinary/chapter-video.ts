"use server"

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function upload(previousState: string | undefined | null, formData: FormData) {
  const file = formData.get('video') as File;
  const buffer: Buffer = Buffer.from(await file.arrayBuffer());
  
  try {
    const base64Image: string = `data:${file.type};base64,${buffer.toString(
      'base64'
    )}`;

    // console.log(`The file: ${previousState} is uploading...`);
    const response = await cloudinary.uploader.upload(base64Image, {
      resource_type: 'video',
      public_id: 'my_video',
    });

    previousState = response.secure_url;
    return previousState
  } catch (error: any) {
    console.error(error);
  }
}