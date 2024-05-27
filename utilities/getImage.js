const access_key = "SJ04Fzv8Aki-BRwrTjjpLNCO94pib6flzLsZlzq3pKQ";

async function getImage(keyword) {
  const url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=1`;
  const headers = {
    Authorization: `Client-ID ${access_key}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (response.ok) {
      const data = await response.json();
      if (data.results.length > 0) {
        return data.results[0].urls.regular;
      } else {
        return "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg";
      }
    }
  } catch (error) {
    return "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg";
  }
}

module.exports = { getImage };
