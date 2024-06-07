// import React, { FC, useState } from "react";
// import { api } from "@/utils/api";

// const UploadPage: FC = () => {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Upload and Delete Image</h1>
//       <UploadImage />
//       <DeleteImage />
//     </div>
//   );
// };

// export default UploadPage;

// const UploadImage: FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const mutation = api.upload.uploadImage.useMutation();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setIsUploading(true);

//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64 = reader.result?.toString().split(',')[1];

//       if (base64) {
//         console.log("Base64 string generated:", base64.slice(0, 30) + "...");

//         try {
//           const result = await mutation.mutateAsync({
//             file: base64,
//             fileName: file.name,
//             contentType: file.type,
//           });
//           alert(`Image uploaded successfully! URL: ${result.image_url}`);
//         } catch (error) {
//           console.error("Failed to upload image:", error);
//           alert('Failed to upload image');
//         } finally {
//           setIsUploading(false);
//         }
//       } else {
//         console.error("Failed to generate base64 string from file");
//         setIsUploading(false);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={isUploading}>
//         {isUploading ? "Uploading..." : "Upload"}
//       </button>
//       {isUploading && <p>Uploading...</p>}
//     </div>
//   );
// };

// const DeleteImage: FC = () => {
//   const [publicId, setPublicId] = useState<string>('');
//   const mutation = api.upload.deleteImage.useMutation();

//   const handleDelete = async () => {
//     if (!publicId) return;

//     try {
//       const result = await mutation.mutateAsync({ public_id: publicId });
//       alert(`Image deleted successfully! Public ID: ${result.public_id}`);
//     } catch (error) {
//       console.error("Failed to delete image:", error);
//       alert('Failed to delete image');
//     }
//   };

//   return (
//     <div>
//       <input 
//         type="text" 
//         placeholder="Enter public ID of image to delete" 
//         value={publicId} 
//         onChange={(e) => setPublicId(e.target.value)} 
//       />
//       <button onClick={handleDelete}>Delete Image</button>
//     </div>
//   );
// };
