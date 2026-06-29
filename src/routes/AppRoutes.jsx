import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Intake from "../pages/Intake.jsx";
import PurchaseRequisition from "../pages/PurchaseRequisition.jsx";
import Events from "../pages/Events.jsx";
import PurchaseOrders from "../pages/PurchaseOrders.jsx";
import Settings from "../pages/Settings.jsx";
import NotFound from "../pages/NotFound.jsx";
import { ROUTES } from "../constants/routes.js";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.DASHBOARD.substring(1)} element={<Dashboard />} />
        <Route path={ROUTES.INTAKE.substring(1)} element={<Intake />} />
        <Route path={ROUTES.PURCHASE_REQUISITION.substring(1)} element={<PurchaseRequisition />} />
        <Route path={ROUTES.EVENTS.substring(1)} element={<Events />} />
        <Route path={ROUTES.PURCHASE_ORDERS.substring(1)} element={<PurchaseOrders />} />
        <Route path={ROUTES.SETTINGS.substring(1)} element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
