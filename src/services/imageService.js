const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const searchQueries = [
  "indian college students",
  "students studying classroom",
  "university campus india",
  "engineering students india",
  "college friends campus",
  "library students studying",
  "modern university building",
  "college life students"
];

const getRandomQuery = () => {
  const index = Math.floor(Math.random() * searchQueries.length);
  return searchQueries[index];
};

export const fetchGalleryImages = async () => {
  try {
    const query = getRandomQuery();

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape`,
      {
        headers: {
          Authorization: API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();

    return data.photos.map((photo) => ({
      id: photo.id,
      src: photo.src.large,
      alt: photo.alt || "College Image",
      photographer: photo.photographer
    }));
  } catch (error) {
    console.error("Image API Error:", error);
    return [];
  }
};