document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const results = document.getElementById("results");

    searchButton.addEventListener("click", function () {
        const query = searchInput.value;

        if (query) {
            // Update the API URL with the new endpoint and query parameters
            const apiUrl = `https://saavn.me/search/songs?query=${query}`;
            // const apiUrl = `http://localhost/search/songs?query=${query}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    displayResults(data.data.results);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    });

    function displayResults(songs) {
        results.innerHTML = "";

        if (songs && songs.length > 0) {
            songs.forEach((song) => {
                const songElement = document.createElement("div");
                songElement.innerHTML = `
                    <div class="songs_display">
                        <a href="${song.url}" target="_blank">
                            <img src="${song.image[1].link}" alt="${song.title} Image">
                        </a>
                        <div>
                            <strong>${song.name}</strong> - ${song.primaryArtists}<br>
                        </div>
                        <a href="${song.downloadUrl[4].link}" target="_blank">
                            <button>Download</button>
                        </a>
                    </div>
                `;
                results.appendChild(songElement);
            });
        } else {
            results.textContent = "No results found.";
        }
    }
});