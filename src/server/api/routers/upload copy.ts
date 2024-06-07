// import { z } from "zod";
// import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
// import { env } from "@/env";
// import { randomUUID } from "crypto";
// import { s3, PutObjectCommand } from "@/server/s3";
// import cloudinary from "@/server/cloudinary";

// export const uploadRouter = createTRPCRouter({
// //   uploadImage: protectedProcedure
// //     .input(z.object({
// //       file: z.string().refine(data => {
// //         const base64Regex = /^[A-Za-z0-9+/=]+$/;
// //         return base64Regex.test(data);
// //       }, {
// //         message: "Invalid base64 string",
// //       }),
// //       fileName: z.string(),
// //       contentType: z.string(),
// //     }))
// //     .mutation(async ({ input, ctx }) => {
// //       const { file, fileName, contentType } = input;
// //       const userId = ctx.session.user.id; 
// //       const buffer = Buffer.from(file, 'base64');
// //       const key = `user_avatar_${userId}_${randomUUID()}`;

// //       try {
// //         console.log("Uploading image for user:", userId);
// //         console.log("File name:", fileName);
// //         console.log("Content type:", contentType);
// //         console.log("Generated key:", key);
// //         console.log("Buffer length:", buffer.length);

// //         const command = new PutObjectCommand({
// //           Bucket: env.AWS_BUCKET_NAME,
// //           Key: key,
// //           Body: buffer,
// //           ContentType: contentType,
// //         });

// //         console.log("Sending command to S3:", command);

// //         const result = await s3.send(command);
// //         console.log("Upload successful:", result);
        
// //         return { success: true, result, url: `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}` };
// //       } catch (error) {
// //         throw error
// //       }
// //     })

// uploadImage: protectedProcedure
//     .input(z.object({
//       file: z.string().refine(data => {
//         const base64Regex = /^[A-Za-z0-9+/=]+$/;
//         return base64Regex.test(data);
//       }, {
//         message: "Invalid base64 string",
//       }),
//       fileName: z.string(),
//       contentType: z.string(),
//     }))
//     .mutation(async ({ input, ctx }) => {
//         const folderName = id + username + type
//     try{
//         const result = await cloudinary.uploader.upload(path, {
//             public_id: 'thumb',
//             folder: folderName
//         })
//         if (!result) {
//             throw new BadRequestError("Error: Upload fail");
//         }
//         fs.unlink(path, (err) => {
//             if (err) {
//                 throw new BadRequestError("Error: Upload fail");
//             }
//             console.log('File deleted successfully');
//         });
//         return {
//             image_url: result.secure_url,
//             thumb_url: await cloudinary.url(result.public_id, {
//                 height: 100,
//                 width: 100,
//                 format: 'jpg'
//             }),
//             public_id: result.public_id
//         }
//     } catch(err){
//         console.error(err)
//     }
//     })
// });

// // const folderName = id + username + type
// //     try{
// //         const result = await cloudinary.uploader.upload(path, {
// //             public_id: 'thumb',
// //             folder: folderName
// //         })
// //         if (!result) {
// //             throw new BadRequestError("Error: Upload fail");
// //         }
// //         fs.unlink(path, (err) => {
// //             if (err) {
// //                 throw new BadRequestError("Error: Upload fail");
// //             }
// //             console.log('File deleted successfully');
// //         });
// //         return {
// //             image_url: result.secure_url,
// //             thumb_url: await cloudinary.url(result.public_id, {
// //                 height: 100,
// //                 width: 100,
// //                 format: 'jpg'
// //             }),
// //             public_id: result.public_id
// //         }
// //     } catch(err){
// //         console.error(err)
// //     }