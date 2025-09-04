import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrder,
} from "./features/order/CreateOrder";
import Order, { loader as loadOrder } from "./features/order/Order";
import { action as updateOrderPriorityAction } from "./features/order/UpdateOrderPriority";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder />, action: createOrder },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,
        action: updateOrderPriorityAction,
        loader: loadOrder,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
