/**
 * Create a base64 binary string representation of a file.
 */
export const getFileBinary = async (file: File) => {
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;
      resolve(binaryStr);
    };

    reader.readAsDataURL(file);
  });
};
