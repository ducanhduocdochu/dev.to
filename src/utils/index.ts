export const ToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function timeDifference(timestampStr: string): string {
  const timestamp = new Date(timestampStr);
  const now = new Date();

  const diffInMs = now.getTime() - timestamp.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else {
    return `${diffInMonths} months ago`;
  }
}

export function extractPublicId(url: string): string {
  const regex = /\/upload\/(?:v\d+\/)?(.+)\./;
  const match = url.match(regex);
  if (match?.[1]) {
    return match[1];
  } else {
    throw new Error("Invalid Cloudinary URL");
  }
}
