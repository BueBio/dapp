const { REACT_APP_IMAGE_URL_BASE } = process.env;

export default function urlFromImage(image) {
  return `${REACT_APP_IMAGE_URL_BASE}${image.filename}`;
}
