async function fetchWithRetry(url: string, retries = 3, delay = 3000) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 429 && attempt < retries) {
          console.warn(`Rate limit reached. Retrying in ${delay / 1000}s...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
          continue;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  throw new Error("Failed to fetch data after retries");
}

export default fetchWithRetry;
