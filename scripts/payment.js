// payment.js


document.addEventListener("DOMContentLoaded", function() {
    // Add event listener for the pay button
    document.querySelector('.pay-btn').addEventListener('click', function (event) {
        event.preventDefault();

        const cardNumber = document.getElementById('card-number').value;
        const expirationDate = document.getElementById('expiration-date').value;
        const cvv = document.getElementById('cvv').value;

        console.log("Pay button clicked"); // Check if the button is working

        // Enhanced validation to ensure all details are numeric
        if (!validateCardNumber(cardNumber)) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }

        if (!validateCVV(cvv)) {
            alert("Please enter a valid 3-digit CVV.");
            return;
        }

        // Redirect to confirmation page if validation passes
        alert("Payment successful!");
        window.location.href = '/order-confirmed';
    });
});

// Validation functions
function validateCardNumber(number) {
    return /^[0-9]{16}$/.test(number);
}

function validateExpirationDate(date) {
    return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(date);
}

function validateCVV(cvv) {
    return /^[0-9]{3}$/.test(cvv);
}
