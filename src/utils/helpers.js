export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const generatePurchaseOrderID = () => {
  return `PO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const generateRequestID = () => {
  return `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const generateEmployeeID = () => {
  return `EMP${Math.floor(10000 + Math.random() * 90000)}`;
};

export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getStatusColor = (status, stylesObj) => {
  return stylesObj[status] || stylesObj.default;
};

export const searchProducts = (products, searchTerm) => {
  if (!searchTerm) return products;
  const lowerSearch = searchTerm.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerSearch) ||
      product.vendor.toLowerCase().includes(lowerSearch)
  );
};

export const filterProducts = (products, vendorFilter, availabilityFilter, defaultVendor, defaultAvailability) => {
  return products.filter((product) => {
    const matchesVendor = vendorFilter === defaultVendor || product.vendor === vendorFilter;
    const matchesAvailability = availabilityFilter === defaultAvailability || product.availability === availabilityFilter;
    return matchesVendor && matchesAvailability;
  });
};

export const sortProducts = (products, sortBy = "name", order = "asc") => {
  return [...products].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
};

export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};
