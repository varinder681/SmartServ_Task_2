import "./ProductTable.css";
import { useEffect, useState } from "react";

const ProductTable = ({ fields, prod }) => {
  const [products, setProducts] = useState(prod);

  const arrayProduct = Object.keys(products).map(
    (product) => products[product]
  );
  arrayProduct.sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="container">
      <div className="header">
        {fields.map((field, idx) => {
          return (
            <div key={`field idx - ${idx}`} className="col">
              <p>{field}</p>
            </div>
          );
        })}
      </div>
      <div className="container-data">
        {arrayProduct.map((product, idx) => {
          return (
            <div key={`${idx}-idx ${product.title}`} className="row">
              {fields.map((field, index) => {
                return (
                  <div key={`${idx} ### ${field} + ${product.title}`} className="col">
                    <p>{product[field]}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default ProductTable;
