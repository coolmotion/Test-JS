/* script.js */

const csvUrl = 'products.csv'; // Replace with your actual CSV file path

const productContainer = document.getElementById('products-container');

fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        const headers = lines[0].split(',');

        // Remove unnecessary line break at the end
        if (lines.length > 1 && lines[lines.length - 1] === '') {
            lines.pop();
        }

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');

            const productName = values[headers.indexOf('name')];
            const productPrice = values[headers.indexOf('price')];

            const productCard = createProductCard(productName, productPrice);
            productContainer.appendChild(productCard);
        }
    })
    .catch(error => {
        console.error('Error fetching CSV:', error);
    });

function createProductCard(productName, productPrice) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const nameElement = document.createElement('h3');
    nameElement.classList.add('product-name');
    nameElement.textContent = productName;
    card.appendChild(nameElement);

    const priceElement = document.createElement('p');
    priceElement.classList.add('product-price');
    priceElement.textContent = `Price: $${productPrice}`;
    card.appendChild(priceElement);

    return card;
}
