import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import OrdersTable from "../components/orders/OrdersTable";
import { getOrders } from "../services/orderService";
import { ROUTES } from "../constants/routes";

export default function PurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getOrders()
      .then(setPurchaseOrders)
      .catch((error) => {
        console.error("Failed to load orders", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
        <div className="h-[600px] bg-white rounded-xl border border-slate-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Purchase Orders</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track vendor purchase orders across departments.</p>
        </div>
        <Link to={ROUTES.PURCHASE_REQUISITION} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm w-fit">
          <Plus className="w-4 h-4 mr-2" />
          Create PO
        </Link>
      </div>

      <OrdersTable data={purchaseOrders} />
    </div>
  );
}
