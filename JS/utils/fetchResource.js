

export default async function getResourceAsString(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text(); // Converts response body to string
    return data;
}

// Usage
// getResourceAsString('/img/pic.svg').then(str => console.log(str));
