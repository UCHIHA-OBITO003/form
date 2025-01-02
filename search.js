document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const resetButton = document.getElementById("resetButton");
    const resultsContainer = document.getElementById("results");

    const filters = {
        name: document.getElementById("nameSearch"),
        email: document.getElementById("emailSearch"),
        contact: document.getElementById("contactSearch"),
        pan: document.getElementById("panSearch"),
        gender: document.getElementById("genderSearch"),
        pincode: document.getElementById("pincodeSearch"),
        ageAbove: document.getElementById("ageAboveSearch"),
        ageBelow: document.getElementById("ageBelowSearch"),
        education: document.getElementById("educationSearch"),
        country: document.getElementById("countrySearch"),
        profilePicture: document.getElementById("profilePictureSearch"),
    };

    const data = JSON.parse(localStorage.getItem("formData")) || [];

    function filterRecords() {
        const filteredData = data.filter(record => {
            return (
                (!filters.name.value || record.name.toLowerCase().includes(filters.name.value.toLowerCase())) &&
                (!filters.email.value || record.email.toLowerCase().includes(filters.email.value.toLowerCase())) &&
                (!filters.contact.value || record.contact.toLowerCase().includes(filters.contact.value.toLowerCase())) &&
                (!filters.pan.value || record.pan.toLowerCase().includes(filters.pan.value.toLowerCase())) &&
                (!filters.gender.value || record.gender === filters.gender.value) &&
                (!filters.pincode.value || record.pincode.includes(filters.pincode.value)) &&
                (!filters.ageAbove.value || parseInt(record.age, 10) >= parseInt(filters.ageAbove.value, 10)) &&
                (!filters.ageBelow.value || parseInt(record.age, 10) <= parseInt(filters.ageBelow.value, 10)) &&
                (!filters.education.value || record.education.toLowerCase().includes(filters.education.value.toLowerCase())) &&
                (!filters.country.value || record.country === filters.country.value)
            );
        });

        displayResults(filteredData);
    }

    function displayResults(records) {
        resultsContainer.innerHTML = "";
        if (records.length === 0) {
            resultsContainer.innerHTML = "<p class='text-center'>No matching records found.</p>";
            return;
        }

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
                            Contact: ${record.contact}<br>
                            PAN: ${record.pan}<br>
                            DOB: ${record.dob}<br>
                            Age: ${record.age}<br>
                            Gender: ${record.gender}<br>
                            Address: ${record.address}<br>
                            Country: ${record.country}<br>
                            Education: ${record.education}
                        </p>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }

    searchButton.addEventListener("click", filterRecords);

    resetButton.addEventListener("click", () => {
        resultsContainer.innerHTML = "<p class='text-center'>Please use filters and click search.</p>";
    });

    // Initialize with all data
    resultsContainer.innerHTML = "<p class='text-center'>Please use filters and click search.</p>";
});
