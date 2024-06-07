'use strict'

import { env } from "@/env";

const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dvubvnnt9', 
  api_key: '375189926762265', 
  api_secret: env.CLOUDINARY_API_SECRET 
});

export default cloudinary