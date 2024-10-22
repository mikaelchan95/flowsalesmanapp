export const calculateTotal = (items: Array<{ product: { price: number }; quantity: number }>): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};