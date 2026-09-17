/** Real, licensed-for-hotlink Unsplash photography, resized via their CDN. */
export function unsplash(photoId: string, width = 1600, height = 1200) {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;
}
