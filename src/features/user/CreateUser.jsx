import { useState } from "react";
import InputBox from "../../ui/InputBox";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || username.at(0) === " ") return;
    dispatch(updateName(username));
    setUsername("");
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-8 text-sm text-stone-600 sm:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <InputBox
        type="text"
        width="small"
        placeholder="Your full name"
        // className="w-72 bg-stone-50 px-2 py-0.5"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div className="mt-8">
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
