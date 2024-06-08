'use strict';

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import cloudinary from "@/server/cloudinary";
import fs from 'fs';
import path from 'path';

interface CloudinaryDeleteResponse {
  result: string;
}

const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

export const uploadRouter = createTRPCRouter({
  uploadImage: protectedProcedure
    .input(z.object({
      file: z.string().refine(data => base64Regex.test(data), {
        message: "Invalid base64 string",
      }),
      fileName: z.string(),
      contentType: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { file, fileName, contentType } = input;
      const userId = ctx.session.user.id;
      const userName = ctx.session.user.name;
      const buffer = Buffer.from(file, 'base64');
      const tempFilePath = path.join('/tmp', `temp_${fileName}`);
      const folderName = `${userId}_${userName}_avatar`;

      try {
        // Ensure the temporary directory exists
        await fs.promises.mkdir('/tmp', { recursive: true });

        // Write the buffer to a temporary file
        await fs.promises.writeFile(tempFilePath, buffer);

        // Upload the temporary file to Cloudinary
        const result = await cloudinary.uploader.upload(tempFilePath, {
          public_id: 'avatar',
          folder: folderName
        });

        if (!result) {
          throw new Error("Error: Upload failed");
        }

        // Delete the temporary file
        await fs.promises.unlink(tempFilePath);

        return {
          image_url: result.secure_url,
          thumb_url: cloudinary.url(result.public_id, {
            height: 100,
            width: 100,
            format: 'jpg'
          }),
          public_id: result.public_id
        };
      } catch (err) {
        // Attempt to delete the temporary file if an error occurs
        await fs.promises.unlink(tempFilePath).catch(() => {});
        throw err;
      }
    }),

  deleteImage: protectedProcedure
    .input(z.object({
      public_id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { public_id } = input;

      try {
        const result = await cloudinary.uploader.destroy(public_id) as CloudinaryDeleteResponse;

        if (result.result !== 'ok') {
          throw new Error(`Error: Deletion failed for public_id ${public_id}`);
        }

        return {
          message: `Image deleted successfully`,
          public_id: public_id
        };
      } catch (err) {
        console.error("Deletion failed:", err);
        throw new Error("Failed to delete image");
      }
    }),
});
