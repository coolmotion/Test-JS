// app.js

// Function to fetch and parse CSV data
async function fetchCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    return Papa.parse(data, { header: true, skipEmptyLines: true }).data;
}

// Sample product data (replace this with your actual data)
let products = [];

// Function to filter and display products based on the selected category
function filterProducts(category) {
    const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Function to display products in the product container
function displayProducts(products) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.textContent = product.name;

        productContainer.appendChild(productCard);
    });
}

// Fetch CSV data and initialize the products array
fetchCSV('products.csv')
    .then(data => {
        products = data;
        filterProducts('all'); // Display all products by default
    })
    .catch(error => console.error('Error fetching CSV:', error));
