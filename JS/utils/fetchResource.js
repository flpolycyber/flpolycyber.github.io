

export default async function getResourceAsString(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text(); // Converts response body to string
}

// Usage
// getResourceAsString('/img/pic.svg').then(str => console.log(str));
