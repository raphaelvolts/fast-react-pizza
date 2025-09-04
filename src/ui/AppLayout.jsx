import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <main className="mx-auto h-auto w-[60%] max-w-6xl min-w-fit overflow-auto px-2 sm:overflow-visible">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
