'use strict';

import { env } from "@/env";
import { v2 as cloudinary, ConfigOptions } from 'cloudinary';

const cloudinaryConfig: ConfigOptions = {
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

export default cloudinary;
