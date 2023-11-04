import axios from "axios";
import { ItemCard } from "./ItemCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { useState, useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=20").then((res) => {
      res.data.products.map((product) => {
        return setProducts((prev) => [...prev, product]);
      });
    });
  }, []);

  const add = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div>
      <h1>All Items</h1>
      <div className="items-list">
        {products.length === 0 ? (
          <div>LOADING</div>
        ) : (
          products.map((product) => {
            return (
              <ItemCard
                home={true}
                key={product.id}
                itemKey={product.id}
                title={product.title}
                price={product.price}
                imageLink={product.images[product.images.length - 1]}
                onButtonClick={() => {
                  add(product);
                  alert(product.title + " has been added succesfully");
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
