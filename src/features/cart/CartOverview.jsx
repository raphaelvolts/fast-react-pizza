import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getTotalCartQuantity, getTotalCartValue } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  let location = useLocation();

  const totalPizzas = useSelector(getTotalCartQuantity);
  const totalAmount = useSelector(getTotalCartValue);

  if (!totalPizzas) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-2 py-4 text-sm text-stone-300 uppercase sm:fixed sm:bottom-0 sm:w-full sm:px-4 sm:text-base">
      <p className="font-semibold">
        <span>{totalPizzas} pizzas </span>
        <span>{formatCurrency(totalAmount)}</span>
      </p>
      {location.pathname !== "/cart" ? (
        <Link to="/cart" className="text-stone-200">
          Open cart &rarr;
        </Link>
      ) : (
        <Link to="/order/new" className="text-stone-200">
          Order now &rarr;
        </Link>
      )}
    </div>
  );
}

export default CartOverview;
