import { formatCurrency } from "../../utilities/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-2">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-medium">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-xs text-stone-500 capitalize italic">
        {isLoadingIngredients
          ? "Loading ingredients..."
          : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
