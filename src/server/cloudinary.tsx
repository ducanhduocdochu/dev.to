'use strict';

import { env } from "@/env";
import { v2 as cloudinary, ConfigOptions } from 'cloudinary';

const cloudinaryConfig: ConfigOptions = {
  cloud_name: 'dvubvnnt9',
  api_key: '375189926762265',
  api_secret: env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

export default cloudinary;
