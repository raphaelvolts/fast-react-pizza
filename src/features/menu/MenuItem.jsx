import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import {
  addItem,
  decreaseItemQuantity,
  getQuantityById,
  increaseItemQuantity,
} from "../cart/cartSlice";
import DeleteItem from "../../ui/DeleteItem";
import UpdateQuantity from "../../ui/UpdateQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getQuantityById(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    if (cart.find((item) => item.pizzaId === id))
      dispatch(increaseItemQuantity(id));
    else dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}
          {!soldOut &&
            (!currentQuantity ? (
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            ) : (
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <UpdateQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteItem pizzaId={id} />
              </div>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
