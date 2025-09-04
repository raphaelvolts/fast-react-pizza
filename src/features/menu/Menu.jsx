import { Navigate, redirect, useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";

export default function Menu() {
  // const username = useSelector((state) => state.user.username);
  const menu = useLoaderData();

  // if (username === "") return <Navigate to="/" />;
  // console.log(menu);

  return (
    <>
      <h1 className="pl-2">Menu</h1>
      <ul className="divide-y divide-stone-200 px-2">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
