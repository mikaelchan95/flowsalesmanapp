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