import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";

function POSPage() {
  // -------------------STATES-------------------

  // product list
  const [products, setProducts] = useState([]);
  // page loading
  const [isLoading, setIsLoading] = useState(false);
  // cart
  const [cart, setCart] = useState([]);
  // total amount
  const [totalAmount, setTotalAmount] = useState(0);

  // toast notification options
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  // ---------------FUNCTIONALITIES---------------

  // get product list from backend
  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("products");
    setProducts(await result.data);
    setIsLoading(false);
  };

  // add product to cart
  const addProductToCart = async (product) => {
    // check if the adding product exist
    let findProductInCart = await cart.find((item) => item.id === product.id);

    // if product exist, update cart quantity and total amount
    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`, toastOptions);
    } else {
      let addProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addProduct]);
      toast(`Added ${product.name} to cart`, toastOptions);
    }
  };

  //  remove product from cart
  const removeProduct = async (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // handle print function for payment
  const handlePrint = () => {
    handleReactToPrint();
  };

  const componentRef = useRef();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((item) => {
      newTotalAmount += parseInt(item.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <MainLayout>
      <div className="row">
        <div className="col-lg-8">
          {isLoading ? (
            "Loading"
          ) : (
            <div className="row">
              {products.map((product, key) => (
                <div key={key} className="col-lg-4 mb-4">
                  <div
                    className="pos-item px-3 text-center border"
                    onClick={() => addProductToCart(product)}
                  >
                    <p>{product.name}</p>
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.name}
                    />
                    <p>${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div style={{ display: "none" }}>
            <ComponentToPrint
              cart={cart}
              totalAmount={totalAmount}
              ref={componentRef}
            />
          </div>
          <div className="table-responsive bg-dark">
            <table className="table table-responsive table-dark table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {cart
                  ? cart.map((item, key) => (
                      <tr key={key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalAmount}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeProduct(item)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  : "No Item in Cart"}
              </tbody>
            </table>
            <h2 className="px2 text-white"> Total Amount: ${totalAmount}</h2>
          </div>

          <div className="mt-3">
            {totalAmount !== 0 && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handlePrint();
                  }}
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
