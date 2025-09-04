import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 px-4 text-xl font-semibold sm:mb-10 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, and to your plate.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue to our Menu, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
