export const checkImageURL = (url) => {
  if (!url || typeof url !== "string") return false;
  const pattern = new RegExp(
    "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
    "i"
  );
  return pattern.test(url);
};
