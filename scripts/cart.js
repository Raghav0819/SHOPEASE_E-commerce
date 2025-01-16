document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    // Helper function to format numbers as currency
    const formatCurrency = (num) => `Rs. ${num.toLocaleString("en-IN")}/-`;

    // Function to update subtotal and total
    const updateTotals = () => {
        let subtotal = 0;
        document.querySelectorAll(".item").forEach((item) => {
            const price = parseInt(item.getAttribute("data-price"), 10);
            const quantity = parseInt(item.querySelector(".quantity").textContent, 10);
            subtotal += price * quantity;
        });
        subtotalElement.textContent = formatCurrency(subtotal);
        totalElement.textContent = formatCurrency(subtotal);
    };

    // Add event listeners for quantity buttons
    cartItemsContainer.addEventListener("click", (event) => {
        const button = event.target;
        if (button.classList.contains("quantity-btn")) {
            const item = button.closest(".item");
            const quantityElement = item.querySelector(".quantity");
            let quantity = parseInt(quantityElement.textContent, 10);

            if (button.classList.contains("plus-btn")) {
                quantity++;
            } else if (button.classList.contains("minus-btn") && quantity > 1) {
                quantity--;
            }

            quantityElement.textContent = quantity;
            updateTotals();
        }

        // Handle item deletion
        if (button.closest(".item-delete")) {
            const item = button.closest(".item");
            item.remove();
            updateTotals();
        }
    });


});
