import { getItem, setItem } from '@/helpers/localStorage';
import { parseJSON } from '@/utils/common';

const CART_LOCAL_STORAGE_KEY = 'CART_LOCAL_STORAGE_KEY';

export const getCartFromLocalStorage = (userId) => {
  const cartItem = parseJSON(getItem(CART_LOCAL_STORAGE_KEY));
  return cartItem?.[userId] ?? {};
};

export const resetCartAtLocalStorage = (userId) => {
  const cartItem = parseJSON(getItem(CART_LOCAL_STORAGE_KEY));
  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItem,
    [userId]: undefined,
  });
};

export const setCartToLocalStorage = (cart, userId) => {
  const cartItem = parseJSON(getItem(CART_LOCAL_STORAGE_KEY));
  if (!cartItem) {
    setItem(CART_LOCAL_STORAGE_KEY, { [userId]: cart });
    return;
  }
  setItem(CART_LOCAL_STORAGE_KEY, { ...cartItem, [userId]: cart });
};

export const calculateTotal = (cart) =>
  Object.values(cart).reduce(
    (acc, item) => ({
      totalCount: acc.totalCount + item.count,
      totalPrice: acc.totalPrice + item.price * item.count,
    }),
    { totalCount: 0, totalPrice: 0 }
  );
