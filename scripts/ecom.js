// Ensure the script runs after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Search Functionality
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            document.querySelectorAll('.product').forEach(product => {
                const text = product.textContent.toLowerCase();
                product.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // Dynamic "Add to Cart" Feature
    let cartCount = 0;
    const cartLink = document.querySelector('.nav-links a[href="/cart"]');
    document.querySelectorAll('.product').forEach(product => {
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        product.appendChild(button);

        button.addEventListener('click', () => {
            cartCount++;
            alert('Item added to cart!');
            if (cartLink) {
                cartLink.textContent = `Cart (${cartCount})`;
            }
        });
    });

    
    // Back to Top Button
    const topButton = document.createElement('button');
    topButton.textContent = 'Back to Top';
    topButton.style.position = 'fixed';
    topButton.style.bottom = '20px';
    topButton.style.right = '20px';
    topButton.style.padding = '10px';
    topButton.style.display = 'none';
    document.body.appendChild(topButton);

    window.addEventListener('scroll', () => {
        topButton.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hover Effects for Products
    document.querySelectorAll('.product').forEach(product => {
        product.addEventListener('mouseenter', () => {
            product.style.transform = 'scale(1.1)';
            product.style.transition = 'transform 0.2s';
        });
        product.addEventListener('mouseleave', () => {
            product.style.transform = 'scale(1)';
        });
    });

    // Interactive Footer Links
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            alert(`You clicked on: ${link.textContent}`);
        });
    });

    // Lazy Loading for Images
    const lazyImages = document.querySelectorAll('img');
    if (lazyImages.length > 0) {
        const lazyLoad = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src') || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        };

        const observer = new IntersectionObserver(lazyLoad, { threshold: 0.1 });

        lazyImages.forEach(img => {
            const src = img.src;
            img.setAttribute('data-src', src);
            img.src = '';
            observer.observe(img);
        });
    }
});


// Dynamic "Add to Cart" Feature
document.querySelectorAll('.product').forEach(product => {
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    product.appendChild(button);

    button.addEventListener('click', () => {
        // Get product details from data attributes
        const productId = product.getAttribute('data-id');
        const productName = product.getAttribute('data-name');
        const productPrice = product.getAttribute('data-price');

        // Send product data to the backend
        fetch('/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: '1234567890', // Replace with actual logged-in user's ID
                productId: productId,
                name: productName,
                price: productPrice,
            }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Item added to cart!');
                console.log('Cart response:', data);
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
            });
    });
});



// Fetch and Render JSON Data
document.addEventListener('DOMContentLoaded', () => {
    fetch('/ecom.json') // Replace with your JSON file path or API URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('products-container');
            
            // Loop through each product and create HTML structure
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.setAttribute('data-id', product.id);

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name} <br> Rs. ${product.price}/-</p>
                    <button>Add to Cart</button>
                `;

                container.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});



document.querySelectorAll('.product').forEach(product => {
    const button = product.querySelector('button');
    button.addEventListener('click', async () => {
        const productId = product.getAttribute('data-id'); // Ensure each product has a unique `data-id`
        const name = product.querySelector('p').textContent.split('Rs')[0].trim();
        const price = parseInt(product.querySelector('p').textContent.split('Rs')[1].replace('/-', '').trim());

        const userId = '1234567890'; // Replace with actual user ID logic

        try {
            const response = await fetch('/add-to-cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId, name, price })
            });

            if (response.ok) {
                alert('Item added to cart!');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to add item to cart');
        }
    });
});

