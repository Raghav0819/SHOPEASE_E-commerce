// Get elements
const mobileNumberInput = document.getElementById('mobile-number');
const continueButton = document.getElementById('continue-btn');
const validationMessage = document.getElementById('validation-message');

// Function to validate mobile number
function validateMobileNumber() {
    const mobileNumber = mobileNumberInput.value.trim();
    const isValid = /^[0-9]{10}$/.test(mobileNumber);

    if (isValid) {
        validationMessage.textContent = ""; // Clear error message
        continueButton.disabled = false; // Enable continue button
    } else {
        validationMessage.textContent = "Please enter a valid 10-digit mobile number.";
        continueButton.disabled = true; // Disable continue button
    }
}

// Event listener to validate on input change
mobileNumberInput.addEventListener('input', validateMobileNumber);

// Prevent form submission if number is invalid (only relevant if button is set to submit)
continueButton.addEventListener('click', (event) => {
    if (continueButton.disabled) {
        event.preventDefault();
        alert("Please enter a valid mobile number.");
    } else {
        window.location.href = "loggedin.html"; // Redirect on success
    }
});
