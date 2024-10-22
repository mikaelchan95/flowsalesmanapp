export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-SG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'text-green-600';
    case 'outstanding':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export const calculateTotalAmount = (items: Array<{ product: { price: number }; quantity: number }>): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const calculateGST = (amount: number): number => {
  return amount * 0.09; // 9% GST
};

export const calculateTotalWithGST = (amount: number): number => {
  return amount + calculateGST(amount);
};

export const filterItems = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] => {
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  return items.filter((item) =>
    fields.some((field) =>
      String(item[field]).toLowerCase().includes(lowercasedSearchTerm)
    )
  );
};