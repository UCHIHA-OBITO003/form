// form-validation.js

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
      India: ["Karnataka", "Maharashtra", "Tamil Nadu", "Delhi"],
      USA: ["California", "Texas", "New York", "Florida"],
      Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
      Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia"],
      UK: ["England", "Scotland", "Wales", "Northern Ireland"],
  };

  const districts = {
      Karnataka: ["Bengaluru", "Mysuru", "Hubli"],
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      // Add more districts for other states...
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

  // Form validation and submission
  form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
          form.classList.add("was-validated");
          return;
      }

      // Retrieve form data
      const formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          address: document.getElementById("address").value,
          country: document.getElementById("country").value,
          state: document.getElementById("state").value,
          district: document.getElementById("district").value,
          pincode: document.getElementById("pincode").value,
          contact: document.getElementById("contact").value,
          dob: document.getElementById("dob").value,
          gender: document.getElementById("gender").value,
          education: document.getElementById("education").value,
          username: document.getElementById("username").value,
          pan: document.getElementById("pan").value,
          profilePicture: null, // Will store base64 image later
      };

      // Validate and store profile picture as base64
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
  });

  function saveData(data) {
      const allData = JSON.parse(localStorage.getItem("formData")) || [];
      allData.push(data);
      localStorage.setItem("formData", JSON.stringify(allData));
      alert("Form submitted successfully!");
      form.reset();
      form.classList.remove("was-validated");
  }
});
