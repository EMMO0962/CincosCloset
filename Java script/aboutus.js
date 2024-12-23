document.getElementById("searchButton").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const elements = document.querySelectorAll("body *:not(script):not(style)");
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
        if (element.children.length === 0 && element.textContent.toLowerCase().includes(searchTerm)) {
            const match = document.createElement("div");
            match.textContent = element.textContent.trim();
            match.classList.add("result-item");
            match.setAttribute("data-index", index); // Save the element index for scrolling
            resultsBox.appendChild(match);

            element.style.backgroundColor = "yellow"; // Highlight matching text
            found = true;

            match.addEventListener("click", () => {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                element.style.border = "2px solid red"; // Highlight the clicked element
                setTimeout(() => {
                    element.style.border = ""; // Remove the border after a short delay
                }, 2000);
            });
        } else {
            element.style.backgroundColor = ""; // Reset background for non-matching elements
        }
    });

    if (!found) {
        resultsBox.innerHTML = `<div>No results found for "${searchTerm}".</div>`;
    }
});


function openModal(name, position, description, image) {
    document.getElementById('teamModal').style.display = 'flex';
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalPosition').textContent = position;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = image;
}

function closeModal() {
    document.getElementById('teamModal').style.display = 'none';
}
