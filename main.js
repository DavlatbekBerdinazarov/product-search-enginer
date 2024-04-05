const main = document.querySelector("main");
const searchInput = document.querySelector("#search");

function truncateTitle(title, wordsCount) {
    // Split the title into words
    let words = title.split(' ');

    // Get the first three or four words
    let truncatedWords = words.slice(0, wordsCount);

    // Join the words back together and add ellipsis
    let truncatedTitle = truncatedWords.join(' ') + (words.length > wordsCount ? ' ...' : '');

    return truncatedTitle;
}

let productsData; // Variable to store the fetched products data

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    productsData = products; // Store the fetched products data
    displayProducts(products); // Display all products initially
  });

function displayProducts(products) {
    main.innerHTML = ''; // Clear the previous products displayed
    products.forEach((product) => {
      const cardProduct = document.createElement("div");
      cardProduct.classList.add("product");

      cardProduct.innerHTML = `
        <div class="img-wrapper">
            <img src="${ product.image }" alt="">
        </div>
        <div>
            <h3>${ truncateTitle(product.title, 6) }</h3>
            <h3>${ product.price }$</h3>
        </div>
      `;
      
      main.appendChild(cardProduct);
    });
}

// Add event listener for the input event
searchInput.addEventListener("input", function() {
    // Get the value of the input element
    var inputValue = searchInput.value.toLowerCase(); // Convert input value to lowercase
  
    // Filter products based on the input value
    const filteredProducts = productsData.filter(product => 
        product.title.toLowerCase().includes(inputValue)
    );
  
    // Display filtered products
    displayProducts(filteredProducts);
});
