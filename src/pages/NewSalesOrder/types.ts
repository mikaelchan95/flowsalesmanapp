export interface CustomerSearchProps {
  customerSearch: string;
  setCustomerSearch: (search: string) => void;
  showCustomerDropdown: boolean;
  filteredCustomers: Array<{ id: number; name: string }>;
  setSelectedCustomer: (customer: { id: number; name: string } | null) => void;
  setShowCustomerDropdown: (show: boolean) => void;
}

export interface OrderItemsProps {
  productSearch: string;
  setProductSearch: (search: string) => void;
  showProductDropdown: boolean;
  filteredProducts: Array<{ id: number; name: string; price: number }>;
  addItem: (product: { id: number; name: string; price: number }, isDutyFree: boolean, isConsignment: boolean) => void;
  items: Array<{ product: { id: number; name: string; price: number }; quantity: number; isDutyFree: boolean; isConsignment: boolean }>;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
}