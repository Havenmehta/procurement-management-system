import { useState, useMemo, useEffect, useCallback } from "react";
import { Search, Filter, ShoppingBag, Package } from "lucide-react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/requisition/ProductCard";
import CartDrawer from "../components/requisition/CartDrawer";
import Toast from "../components/common/Toast";
import { VENDORS } from "../constants/vendors";
import { STATUS } from "../constants/status";

export default function PurchaseRequisition() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorFilter, setVendorFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  
  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch((error) => {
        console.error("Failed to load products", error);
        setToast({ isVisible: true, message: "Failed to load products." });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "" });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVendor = vendorFilter === "All" || product.vendor === vendorFilter;
      const matchesAvailability = availabilityFilter === "All" || product.availability === availabilityFilter;
      
      return matchesSearch && matchesVendor && matchesAvailability;
    });
  }, [products, searchTerm, vendorFilter, availabilityFilter]);

  const uniqueVendors = [VENDORS.ALL, ...new Set(products.map(p => p.vendor))];
  const uniqueAvailabilities = [VENDORS.ALL, STATUS.IN_STOCK, "Low Stock", STATUS.OUT_OF_STOCK];

  const handleAddToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToast({ isVisible: true, message: `${product.name} added to cart.` });
    setTimeout(() => setToast({ isVisible: false, message: "" }), 3000);
  }, []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCartItems([]);
    setIsCartOpen(false);
    setToast({ isVisible: true, message: "Purchase Requisition submitted successfully!" });
    setTimeout(() => setToast({ isVisible: false, message: "" }), 3000);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 h-10 bg-slate-200 rounded animate-pulse" />
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-32 h-10 bg-slate-200 rounded animate-pulse" />
            <div className="w-32 h-10 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden h-[380px] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Internal Procurement Portal</h1>
          <p className="text-slate-500 text-sm mt-1">Browse and request hardware and software for your team.</p>
        </div>
        
        <div className="flex items-center justify-end">
          <button 
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Cart
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="flex-1 md:w-48 flex items-center border border-slate-200 rounded-lg bg-slate-50 px-3 py-2">
            <Filter className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              className="text-sm bg-transparent outline-none w-full text-slate-700 cursor-pointer"
            >
              <option value="All" disabled className="text-slate-400">Vendor</option>
              {uniqueVendors.map(v => <option key={v} value={v}>{v === "All" ? "All Vendors" : v}</option>)}
            </select>
          </div>
          
          <div className="flex-1 md:w-48 flex items-center border border-slate-200 rounded-lg bg-slate-50 px-3 py-2">
             <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="text-sm bg-transparent outline-none w-full text-slate-700 cursor-pointer"
            >
              <option value="All" disabled className="text-slate-400">Availability</option>
              {uniqueAvailabilities.map(a => <option key={a} value={a}>{a === "All" ? "All Availability" : a}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
          />
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
              <Package className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-base font-semibold text-slate-900">No products found</p>
            <p className="text-sm mt-1 max-w-sm text-center">We couldn't find any products matching your search criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        onClose={() => setToast({ isVisible: false, message: "" })} 
      />
    </div>
  );
}
