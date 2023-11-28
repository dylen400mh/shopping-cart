import PropTypes from "prop-types";

function ShopItem({ item, cart, setCart, addToCart, removeFromCart }) {
  function onChange(e) {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.item.id === item.id) {
          return { ...cartItem, quantity: quantity };
        }
        return cartItem;
      });

      setCart(updatedCart);
    } else {
      setCart(cart.filter((cartItem) => cartItem.item.id !== item.id));
    }
  }

  return (
    <div
      id={item.id}
      className="item bg-white p-4 rounded-lg shadow-md w-64 h-auto flex flex-col justify-between"
    >
      <img
        src={item.image}
        alt={item.title}
        className="rounded-md mb-4 w-full"
        style={{ height: "200px" }}
      />
      <span className="block text-gray-800 font-bold text-center">
        {item.title}
      </span>
      <span className="block text-gray-600 text-center">${item.price}</span>
      {cart.some((shopItem) => shopItem.item.id === item.id) ? (
        <div id={item.id} className="flex items-center justify-center mt-4">
          <button
            onClick={() => {
              removeFromCart(item);
            }}
            className="text-gray-500 hover:text-red-500 focus:outline-none"
          >
            -
          </button>
          <input
            type="number"
            step="1"
            min="0"
            value={
              cart.find((cartItem) => cartItem.item.id === item.id).quantity ||
              0
            }
            data-testid="ItemCountInput"
            onChange={onChange}
            className="mx-2 w-12 text-center border border-gray-300 rounded"
          />
          <button
            onClick={() => {
              addToCart(item);
            }}
            className="text-gray-500 hover:text-green-500 focus:outline-none"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            addToCart(item);
          }}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none w-full"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
}

ShopItem.propTypes = {
  item: PropTypes.object,
  cart: PropTypes.array,
  setCart: PropTypes.func,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  id: PropTypes.string,
};

export default ShopItem;
