const UNSPLASH_ACCESS_KEY = "aJFx9yn6QItNcLLNJmKqwLr1i0MOfGrKpOyAsNZrPPQ";
const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const RAILS_BASE_URL = "http://localhost:3000/api/v1"; 

// Unsplash: Fetch random images for show posters
export const fetchUnsplashImages = async (query, count = 30) => {
  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.results.map((image) => ({
      id: image.id,
      url: image.urls.small,
      alt: image.alt_description || "Show poster",
    }));
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    throw error;
  }
};

// Rails API: Fetch all shows
export const fetchAllShows = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/shows");
    if (!response.ok) throw new Error("Failed to fetch shows.");
    const data = await response.json();
    return data.data.map((show) => ({
      id: show.id,
      ...show.attributes,
    }));
  } catch (error) {
    console.error("Error fetching all shows:", error);
    throw error;
  }
};
// Rails API: Fetch a specific user's schedule
export const fetchUserSchedule = async (userId) => {
  try {
    const response = await fetch(`${RAILS_BASE_URL}/users/${userId}/shows`);
    if (!response.ok) throw new Error("Failed to fetch user schedule.");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching schedule for user ID ${userId}:`, error);
    throw error;
  }
};

// Rails API: Add a show to a user's schedule
export const addUserShow = async (userId, showId) => {
  try {
    const response = await fetch(`${RAILS_BASE_URL}/users/${userId}/shows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ show_id: showId }),
    });
    if (!response.ok) throw new Error("Failed to add show to schedule.");
    return await response.json();
  } catch (error) {
    console.error(`Error adding show ID ${showId} for user ID ${userId}:`, error);
    throw error;
  }
};

// Rails API: Remove a show from a user's schedule
export const removeUserShow = async (userId, showId) => {
  try {
    const response = await fetch(`${RAILS_BASE_URL}/users/${userId}/shows/${showId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to remove show from schedule.");
    return await response.json();
  } catch (error) {
    console.error(`Error removing show ID ${showId} for user ID ${userId}:`, error);
    throw error;
  }
};

// Rails API: Fetch all users and their schedules (Admin)
export const fetchAllUserSchedules = async () => {
  try {
    const response = await fetch(`${RAILS_BASE_URL}/users/shows`);
    if (!response.ok) throw new Error("Failed to fetch all user schedules.");
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching all user schedules:", error);
    throw error;
  }
};
