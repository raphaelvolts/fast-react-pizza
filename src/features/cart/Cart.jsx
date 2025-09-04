import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { getUser } from "../user/userSlice";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const username = useSelector(getUser);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="w-dvw px-4 py-3 sm:w-6xl">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="sm: mt-3 flex justify-between space-x-2 sm:justify-start">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
