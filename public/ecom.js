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
    const cartLink = document.querySelector('.nav-links a[href="cart.html"]');
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


