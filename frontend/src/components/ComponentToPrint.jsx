import React from "react";
export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props;
  return (
    <div ref={ref} className="p-5">
      {" "}
      <table className="table">
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Price</td>
            <td>Total</td>
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
                </tr>
              ))
            : "No Item in Cart"}
        </tbody>
      </table>
      <h2 className="px2"> Total Amount: ${totalAmount}</h2>
    </div>
  );
});
