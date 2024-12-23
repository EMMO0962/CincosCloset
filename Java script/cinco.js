document.getElementById("searchButton").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const elements = document.querySelectorAll("body *:not(script):not(style):not(noscript)");
    const resultsBox = document.getElementById("resultsBox");
    resultsBox.style.display = "block"; // Show the results box
    resultsBox.innerHTML = ""; // Clear previous results

    if (searchTerm === "") {
        alert("Please enter a word to search.");
        resultsBox.style.display = "none"; // Hide results box if search term is empty
        return;
    }

    let found = false;

    elements.forEach((element, index) => {
        // Skip if element is hidden (display: none) or not a text-containing element
        if (getComputedStyle(element).display === "none" || element.children.length > 0) {
            return;
        }

        // Check if the text includes the search term
        if (element.textContent.toLowerCase().includes(searchTerm)) {
            const match = document.createElement("div");
            match.textContent = element.textContent.trim();
            match.classList.add("result-item");
            match.setAttribute("data-index", index); // Save the element index for scrolling
            resultsBox.appendChild(match);

            // Highlight the matching element in yellow
            element.style.backgroundColor = "yellow"; 
            found = true;

            match.addEventListener("click", () => {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                element.style.border = "2px solid red"; // Highlight the clicked element
                setTimeout(() => {
                    element.style.border = ""; // Remove the border after a short delay
                }, 2000);
            });
        } else {
            // Reset background color for non-matching elements
            element.style.backgroundColor = "";
        }
    });

    if (!found) {
        resultsBox.innerHTML = `<div>No results found for "${searchTerm}".</div>`;
    }
});
