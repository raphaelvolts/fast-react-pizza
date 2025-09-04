import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const baseStyle =
    "inline-block rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-yellow-200 ";

  const style = {
    primary: baseStyle + " text-sm px-4 py-3 sm:px-6 sm:py-4",
    small: baseStyle + " px-4 py-2 sm:px-5 sm:py-2.5 text-xs",
    round: baseStyle + " px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm",
    secondary:
      "inline-block rounded-full text-sm font-semibold tracking-wide text-stone-600 uppercase border border-2 border-stone-300 px-4 py-2.5 sm:px-6 sm:py-3.5 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500",
  };
  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button disabled={disabled} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}
