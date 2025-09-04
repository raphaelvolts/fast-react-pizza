import Button from "../../ui/Button";
import DeleteItem from "../../ui/DeleteItem";
import UpdateQuantity from "../../ui/UpdateQuantity";
import { formatCurrency } from "../../utilities/helpers";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        {/* <Button type="small">Delete</Button> */}
        <UpdateQuantity pizzaId={pizzaId} currentQuantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
