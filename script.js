const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("searchInput");
let products = [];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    products = json;
    renderProducts(products);
  })
  .catch((err) => console.error("Error fetching products:", err));

function renderProducts(productsToRender) {
  const productListElement = document.getElementById("products");
  productListElement.innerHTML = "";
  productsToRender.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add(
      "col-12",
      "col-sm-6",
      "col-md-4",
      "col-lg-4",
      "col-xl-3",
      "col-xxl-3"
    );
    productElement.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title product-title">${product.title}</h5>
                        <p class="text-success">$ ${product.price}</p>
                        <p class="card-text product-description">${product.description}</p>
                        <a href="viewproduct.html" class="btn btn-warning">View Product</a>
                        <a href="cart.html" class="btn btn-primary">Add to cart</a>
                    </div>
                </div>`;
    productListElement.appendChild(productElement);
  });
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const price = parseInt(searchInput.value);

  const searchProduct = products.filter((product) => product.price < price);

  if (searchProduct.length > 0) {
    renderProducts(searchProduct);
  } else {
    renderProducts(products);
  }
});
