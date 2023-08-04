function addItemToCart(productId, quantity) {
  // Get the data from the API.
  const url = `/api/cart`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        // The data was retrieved successfully.
        const data = response.json();
      } else {
        // An error occurred.
      }
    })
    .catch((error) => {
      // An error occurred.
    });

  // Check if the item already exists in the cart.
  const existingIndex = data.products.findIndex((product) => product.productId === productId);

  // If the item exists, update the quantity.
  if (existingIndex !== -1) {
    data.products[existingIndex].quantity += quantity;
  } else {
    // If the item does not exist, add it to the cart.
    data.products.push({
      productId,
      quantity,
    });
  }

  // Calculate the subtotal and total for the cart.
  for (const product of data.products) {
    product.subtotal = product.price * product.quantity;
  }
  const total = data.products.reduce((acc, product) => {
    return acc + product.subtotal;
  }, 0);

  // Update the data with the subtotals and total.
  data.products = data.products.map((product) => {
    return {
      ...product,
      subtotal,
    };
  });
  data.total = total;

  // Save the data to the API.
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        // The data was saved successfully.
      } else {
        // An error occurred.
      }
    })
    .catch((error) => {
      // An error occurred.
    });
}

// Sample output
let data = {
  userId: 123,
  products: [
    {
      productId: 1,
      name: "Product 1",
      price: 10,
      quantity: 1,
      subtotal: 10,
    },
  ],
  total: 10,
};

addItemToCart(1, 2);

console.log(data);
