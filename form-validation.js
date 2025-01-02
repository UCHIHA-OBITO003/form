document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");

    // Populate country dropdown with a sample list of countries
    const countryDropdown = document.getElementById("country");
    const countries = ["India", "USA", "Canada", "Australia", "UK"];
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countryDropdown.appendChild(option);
    });

    // State and district dependency logic
    const states = {
        India: [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
            "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
            "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
            "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
            "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
            "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry"
        ],
        USA: [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
            "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
            "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
            "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
            "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
            "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
            "Wisconsin", "Wyoming"
        ]
    };
    const districts = {
        Karnataka: [
            "Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belagavi", "Ballari", "Bidar", 
            "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", 
            "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", 
            "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", 
            "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
        ],
        "Tamil Nadu": [
            "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
            "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", 
            "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", 
            "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", 
            "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", 
            "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", 
            "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
        ],

        Texas: [
            "Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", 
            "Arlington", "Corpus Christi", "Plano", "Laredo", "Lubbock", "Garland", 
            "Irving", "Amarillo", "Grand Prairie", "Brownsville", "McKinney", 
            "Frisco", "Pasadena", "Mesquite"
        ],
        "New York": [
            "New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", 
            "New Rochelle", "Mount Vernon", "Schenectady", "Utica", "White Plains", 
            "Troy", "Niagara Falls", "Binghamton", "Rome", "Ithaca", "Poughkeepsie", 
            "North Tonawanda", "Jamestown", "Elmira"
        ]
    };

    countryDropdown.addEventListener("change", (event) => {
        const stateDropdown = document.getElementById("state");
        stateDropdown.innerHTML = '<option value="" disabled selected>Choose...</option>';
        const selectedCountry = event.target.value;
        if (states[selectedCountry]) {
            states[selectedCountry].forEach(state => {
                const option = document.createElement("option");
                option.value = state;
                option.textContent = state;
                stateDropdown.appendChild(option);
            });
        }
    });

    document.getElementById("state").addEventListener("change", (event) => {
        const districtDropdown = document.getElementById("district");
        districtDropdown.innerHTML = '<option value="" disabled selected>Choose...</option>';
        const selectedState = event.target.value;
        if (districts[selectedState]) {
            districts[selectedState].forEach(district => {
                const option = document.createElement("option");
                option.value = district;
                option.textContent = district;
                districtDropdown.appendChild(option);
            });
        }
    });

    // Age Calculation
    const dobInput = document.getElementById("dob");
    const ageInput = document.getElementById("age");
    dobInput.addEventListener("input", () => {
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();
        const calculatedAge = monthDifference < 0 || (monthDifference === 0 && dayDifference < 0) ? age - 1 : age;
        ageInput.value = isNaN(calculatedAge) ? "" : calculatedAge;
    });

    // Password Validation
    const passwordInput = document.getElementById("password");
    passwordInput.addEventListener("input", () => {
        const value = passwordInput.value;
        const isValid = /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && value.length >= 8 && value.length <= 15;
        toggleValidation(passwordInput, isValid);
        passwordInput.setCustomValidity(isValid ? "" : "Invalid password format.");
    });

    // Username Validation
    const usernameInput = document.getElementById("username");
    usernameInput.addEventListener("input", () => {
        const value = usernameInput.value;
        const isValid = /^[A-Za-z][A-Za-z0-9_]{4,14}$/.test(value);
        toggleValidation(usernameInput, isValid);
        usernameInput.setCustomValidity(isValid ? "" : "Username must start with a letter and be 5-15 characters long.");
    });

    // Pincode Validation
    const pincodeInput = document.getElementById("pincode");
    pincodeInput.addEventListener("input", () => {
        const value = pincodeInput.value;
        const isValid = /^[0-9]{6}$/.test(value);
        toggleValidation(pincodeInput, isValid);
        pincodeInput.setCustomValidity(isValid ? "" : "Invalid pincode.");
    });

    // Contact Number Validation
    const contactInput = document.getElementById("contact");
    contactInput.addEventListener("input", () => {
        const value = contactInput.value;
        const isValid = /^[0-9]{10}$/.test(value);
        toggleValidation(contactInput, isValid);
        contactInput.setCustomValidity(isValid ? "" : "Invalid contact number.");
    });

    // PAN Validation
    const panInput = document.getElementById("pan");
    panInput.addEventListener("input", () => {
        const value = panInput.value;
        const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
        toggleValidation(panInput, isValid);
        panInput.setCustomValidity(isValid ? "" : "Invalid PAN format.");
    });

    // Profile Picture Validation
    const profilePictureInput = document.getElementById("profilePicture");
    profilePictureInput.addEventListener("change", () => {
        const file = profilePictureInput.files[0];
        const isValid = file && file.size <= 2 * 1024 * 1024;
        toggleValidation(profilePictureInput, isValid);
        profilePictureInput.setCustomValidity(isValid ? "" : "Profile picture must be less than 2MB.");
    });

    // Form Submission
    form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            event.preventDefault();
        } else {
            const dob = document.getElementById("dob").value;
            const today = new Date();
            const dobDate = new Date(dob);
            const age = today.getFullYear() - dobDate.getFullYear();
            const monthDifference = today.getMonth() - dobDate.getMonth();
            const dayDifference = today.getDate() - dobDate.getDate();
            const calculatedAge = monthDifference < 0 || (monthDifference === 0 && dayDifference < 0) ? age - 1 : age;

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                country: document.getElementById("country").value,
                state: document.getElementById("state").value,
                district: document.getElementById("district").value,
                pincode: document.getElementById("pincode").value,
                contact: document.getElementById("contact").value,
                dob: dob,
                age: calculatedAge,
                gender: document.getElementById("gender").value,
                education: document.getElementById("education").value,
                username: document.getElementById("username").value,
                pan: document.getElementById("pan").value,
                profilePicture: null,
            };

            const profilePictureInput = document.getElementById("profilePicture");
            const file = profilePictureInput.files[0];
            if (file && file.size <= 2 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onload = () => {
                    formData.profilePicture = reader.result;
                    saveData(formData);
                };
                reader.readAsDataURL(file);
            } else {
                alert("Profile picture must be less than 2MB.");
                return;
            }
        }
    });

    function saveData(data) {
        const allData = JSON.parse(localStorage.getItem("formData")) || [];
        allData.push(data);
        localStorage.setItem("formData", JSON.stringify(allData));
        alert("Form submitted successfully!");
        form.reset();
        form.classList.remove("was-validated");
    }

    // Toggle Validation Helper
    function toggleValidation(element, isValid) {
        if (isValid) {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
        } else {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
        }
    }
});
