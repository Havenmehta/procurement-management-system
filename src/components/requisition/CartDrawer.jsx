import { X, Plus, Minus, ShoppingBag, ArrowRight, Laptop, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency } from "../../utils/helpers";
import ImageWithFallback from "../common/ImageWithFallback";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200/60"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200/60 bg-slate-50/50">
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 text-blue-600 mr-3" />
                <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Purchase Cart</h2>
                <span className="ml-3 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-md">
                  {cartItems.length}
                </span>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 px-6 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 shadow-sm mb-2">
                    <ShoppingBag className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Cart is Empty</h3>
                  <p className="text-sm">Add items from the catalog to build your purchase requisition.</p>
                </div>
              ) : (
                <ul className="space-y-5">
                  {cartItems.map((item) => (
                    <li key={item.product.id} className="flex gap-4 p-3 rounded-xl border border-slate-100 bg-white shadow-sm hover:border-slate-200 transition-colors">
                      <div className="w-20 h-20 bg-slate-50/50 rounded-lg border border-slate-100 flex items-center justify-center shrink-0">
                        {item.product.image ? (
                          <ImageWithFallback
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full !object-contain p-2 mix-blend-multiply"
                          />
                        ) : (
                          <Laptop className="w-8 h-8 text-slate-300" />
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-tight">{item.product.name}</h4>
                          <p className="text-xs font-medium text-slate-500 mt-1">{item.product.vendor}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-slate-200 rounded-md bg-white shadow-sm">
                            <button 
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-l-md transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-slate-900 border-x border-slate-200 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-r-md transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <p className="text-sm font-bold text-slate-900">
                              {formatCurrency(item.product.price * item.quantity)}
                            </p>
                            <button 
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-xs text-rose-500 hover:text-rose-600 mt-1 font-medium transition-colors flex items-center"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-5 bg-slate-50/80 border-t border-slate-200/60 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600 font-medium text-sm uppercase tracking-wide">Grand Total</span>
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={onCheckout}
                  className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Checkout Items
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
