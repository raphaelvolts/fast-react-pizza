import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import InputBox from "../../ui/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartValue } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";

import addressPin from "../../assets/addressPin.svg";

import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { clearLocation, fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export default function CreateOrder() {
  const {
    username,
    status: locationStatus,
    position,
    address,
    error: locationError,
  } = useSelector((state) => state.user);
  const isLoadingLocation = locationStatus === "loading";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);
  const [name, setName] = useState(username);

  const dispatch = useDispatch();
  function getAddress(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  const cart = useSelector(getCart);
  const totalCartValue = useSelector(getTotalCartValue);
  const priorityPrice = withPriority ? totalCartValue * 0.2 : 0;
  const totalPrice = totalCartValue + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:basis-40">
            First Name
          </label>
          <div className="grow">
            <InputBox
              type="text"
              name="customer"
              id="customer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="full"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <InputBox type="tel" name="phone" id="phone" width="full" />
            {formErrors?.phone && (
              <p className="mt-2 ml-1 rounded-md bg-red-100 p-2 text-center text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <div className="grow">
            <InputBox
              type="text"
              name="address"
              id="address"
              width="full"
              defaultValue={address}
              disabled={isLoadingLocation}
            />
            {locationStatus === "error" && (
              <p className="mt-2 ml-1 rounded-md bg-red-100 p-2 text-left text-xs text-red-700">
                {locationError}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-0 bottom-[2.5px] z-50 sm:top-[3.8px] sm:right-0">
              <Button
                type="small"
                onClick={getAddress}
                disabled={isLoadingLocation}
              >
                <img
                  src={addressPin}
                  alt="Location Pin"
                  className="h-5 w-5 sm:h-5.5 sm:w-5.5"
                />
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-4">
          <InputBox
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="mapLocation"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
        <div>
          <Button disabled={isSubmitting || isLoadingLocation} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const order = {
    ...formData,
    cart: JSON.parse(formData.cart),
    priority: formData.priority,
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please provide your correct phone number. We may need it to contact you";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  store.dispatch(clearLocation());

  return redirect(`/order/${newOrder.id}`);
}
