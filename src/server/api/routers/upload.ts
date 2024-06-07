'use strict';

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import cloudinary from "@/server/cloudinary";
import fs from 'fs';
import path from 'path';

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
      const tempFilePath = path.join(__dirname, `temp_${fileName}`);
      const folderName = `${userId}_${userName}_avatar`;

      try {
        await fs.promises.writeFile(tempFilePath, buffer);

        const result = await cloudinary.uploader.upload(tempFilePath, {
          public_id: 'avatar',
          folder: folderName
        });

        if (!result) {
          throw new Error("Error: Upload failed");
        }

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
        console.error("Upload failed:", err);
      }
    }),

  deleteImage: protectedProcedure
    .input(z.object({
      public_id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { public_id } = input;

      try {
        // Delete the image from Cloudinary
        const result = await cloudinary.uploader.destroy(public_id);

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
