let products = [];
let filteredProducts = [];
let displayedProducts = 0;
const productsPerPage = 10;

// Fetch products from API
async function fetchProducts() {
    try {
        document.getElementById('product-grid').innerHTML = `<div class="loading">Loading products...</div>`;
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        products = await response.json();
        filteredProducts = products;
        displayProducts();
    } catch (error) {
        document.getElementById('product-grid').innerHTML = `<div class="loading">Failed to load products. Please try again later.</div>`;
        console.error(error);
    }
}

// Display products in the grid
function displayProducts() {
    const grid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const loadMoreBtn = document.getElementById('load-more-container');

    if (filteredProducts.length === 0) {
        grid.innerHTML = `<div class="loading">No products found.</div>`;
        productCount.innerHTML = `0 Results`;
        loadMoreBtn.style.display = 'none';
        return;
    }

    // Slice the products to show only a limited number
    const productsToDisplay = filteredProducts.slice(0, displayedProducts + productsPerPage);
    displayedProducts = productsToDisplay.length;

    grid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
            <img src="${product.image}" alt="${product.title}" onerror="this.src='fallback-image.jpg'">
            </div>
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
            <a href="#"><img src="./images/e-commerce.png" class="wishlist"></a>
        </div>
    `).join('');

    productCount.innerHTML = `${filteredProducts.length} Results`;

    // Hide "Load More" button if all products are displayed
    if (displayedProducts >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Load more products
function loadMoreProducts() {
    displayProducts();
}

// Filter by category
function filterByCategory() {
    const electronicsChecked = document.getElementById('category-electronics').checked;
    const jewelryChecked = document.getElementById('category-jewelry').checked;
    const mensClothingChecked = document.getElementById('category-mens-clothing').checked;
    const womensClothingChecked = document.getElementById('category-womens-clothing').checked;

    filteredProducts = products.filter(product => {
        if (electronicsChecked && product.category === 'electronics') {
            return true;
        }
        if (jewelryChecked && product.category === 'jewelery') {
            return true;
        }
        if (mensClothingChecked && product.category === "men's clothing") {
            return true;
        }
        if (womensClothingChecked && product.category === "women's clothing") {
            return true;
        }
        return false;
    });

    // If no filters are selected, show all products
    if (!electronicsChecked && !jewelryChecked && !mensClothingChecked && !womensClothingChecked) {
        filteredProducts = products;
    }

    displayedProducts = 0; // Reset displayed products count
    displayProducts();
}

// Filter by category for
function filterByCategory1() {
    const electronicsChecked = document.getElementById('category-electronics1').checked;
    const jewelryChecked = document.getElementById('category-jewelry1').checked;
    const mensClothingChecked = document.getElementById('category-mens-clothing1').checked;
    const womensClothingChecked = document.getElementById('category-womens-clothing1').checked;

    filteredProducts = products.filter(product => {
        if (electronicsChecked && product.category === 'electronics') {
            return true;
        }
        if (jewelryChecked && product.category === 'jewelery') {
            return true;
        }
        if (mensClothingChecked && product.category === "men's clothing") {
            return true;
        }
        if (womensClothingChecked && product.category === "women's clothing") {
            return true;
        }
        return false;
    });

    // If no filters are selected, show all products
    if (!electronicsChecked && !jewelryChecked && !mensClothingChecked && !womensClothingChecked) {
        filteredProducts = products;
    }

    displayedProducts = 0; // Reset displayed products count
    displayProducts();
}

// Search functionality
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );

    displayedProducts = 0; // Reset displayed products count
    displayProducts();
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sort-dropdown').value;
    if (sortBy === 'price') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'name') {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayedProducts = 0; // Reset displayed products count
    displayProducts();
}

// Initialize the app
fetchProducts();

 // Select the hamburger and the nav menu
 const hamburger = document.getElementById('hamburger');
 const navMenu = document.getElementById('nav-menu');

 // Add event listener to the hamburger menu
 hamburger.addEventListener('click', function () {
     // Toggle the 'show' class for displaying the menu
     navMenu.classList.toggle('show');
     // Toggle the 'active' class for the hamburger icon animation
     hamburger.classList.toggle('active');
 });