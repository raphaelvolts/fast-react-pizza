import { Link } from "react-router-dom";
import OrderSearch from "../features/order/OrderSearch";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-300 bg-yellow-400 px-2 py-4 sm:px-4">
      <Link to="/" className="tracking-normal md:tracking-widest">
        Fast React Pizza Co.
      </Link>
      <div className="flex items-center justify-between space-x-2 px-4 sm:space-x-4 sm:px-8">
        <OrderSearch />
        <Username />
      </div>
    </header>
  );
}
