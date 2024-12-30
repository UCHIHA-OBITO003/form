// search.js

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("results");

    const data = JSON.parse(localStorage.getItem("formData")) || [];

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredData = data.filter(record => {
            return Object.values(record).some(value => 
                String(value).toLowerCase().includes(query)
            );
        });
        displayResults(filteredData);
    });

    function displayResults(records) {
        resultsContainer.innerHTML = "";
        records.forEach(record => {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-3");
            card.innerHTML = `
                <div class="card">
                    <img src="${record.profilePicture}" class="card-img-top" alt="Profile Picture">
                    <div class="card-body">
                        <h5 class="card-title">${record.name}</h5>
                        <p class="card-text">
                            Email: ${record.email}<br>
                            Address: ${record.address}<br>
                            Country: ${record.country}, State: ${record.state}, District: ${record.district}<br>
                            Pincode: ${record.pincode}<br>
                            Contact: ${record.contact}<br>
                            DOB: ${record.dob}<br>
                            Gender: ${record.gender}<br>
                            Education: ${record.education}<br>
                            PAN: ${record.pan}
                        </p>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }
});
