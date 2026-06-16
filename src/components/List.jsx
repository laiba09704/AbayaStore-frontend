import React from "react";
import Card from "./Card";

function List({ products = [] }) {
  return (
    <div className="container">
      <div className="row">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              key={item.id || item.name}
            >
              <Card product={item} />
            </div>
          ))
        ) : (
          <p className="text-center">No products found</p>
        )}
      </div>
    </div>
  );
}

export default List;