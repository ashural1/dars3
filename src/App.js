import { useState } from "react";
import "../src/index.css";
import allProducts from "./data ";

function App() {
  const [products, setProducts] = useState(allProducts);
  const [originalProducts, setOriginalProducts] = useState(allProducts);

  const deleteProduct = (id) => {
    const filteredProducts = products.filter((product) => {
      return product.id !== id;
    });
    setProducts(filteredProducts);
  };

  const filterByBrand = (brand) => {
    if (brand === "all") {
      setProducts(originalProducts);
    } else {
      const filteredBrand = originalProducts.filter((product) => {
        return product.brand === brand;
      });
      setProducts(filteredBrand);
    }
  };

  const filterByPrice = (price) => {
    const filteredPrice = originalProducts.filter((product) => {
      return product.price <= price;
    });
    setProducts(filteredPrice);
  };

  const filterByRating = (rating) => {
    const filteredRating = originalProducts.filter((product) => {
      return product.rating >= rating;
    });
    setProducts(filteredRating);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 class="mine"></h1>
      </div>

      <div className="filter-container">
        <select
          className="select-style"
          onChange={(e) => {
            filterByBrand(e.target.value);
          }}
        >
          <option value="all">All</option>
          {[...new Set(originalProducts.map((product) => product.brand))].map(
            (brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            )
          )}
        </select>

        <select
          className="select-style"
          onChange={(e) => {
            filterByPrice(parseInt(e.target.value));
          }}
        >
          <option value="">Price</option>
          <option value="100">Less than $100</option>
          <option value="500">Less than $500</option>
          <option value="1000">Less than $1000</option>
        </select>
      </div>

      <ul className="productGrid">
        {products.map((product) => {
          const {
            id,
            thumbnail,
            description,
            title,
            price,
            discountPercentage,
            rating,
            brand,
          } = product;
          return (
            <li key={id} className="productItem">
              <div className="div-img">
                {" "}
                <img
                  src={thumbnail}
                  alt={description}
                  width={400}
                  height={100}
                />
              </div>
              <div className="card-body">
                <h2>{title}</h2>
                <p>
                  <b>Brand:</b> {brand}
                </p>
                <p>
                  <b>Description:</b> {description}
                </p>
                <p>
                  <b>Price: $</b> {price}
                </p>
                <p>
                  <b>Discount :</b> {discountPercentage}%
                </p>

                <div className="delete-button-container">
                  <button
                    onClick={() => deleteProduct(id)}
                    className="btn del-btn"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
