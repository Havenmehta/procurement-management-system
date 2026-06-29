import { useState } from "react";
import { cn } from "../../utils/cn";
import { PRIORITIES } from "../../constants/priorities";
import { VENDORS } from "../../constants/vendors";
import { CATEGORIES } from "../../constants/categories";

export default function IntakeForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    product: "",
    category: "",
    vendor: "",
    quantity: "",
    price: "",
    location: "",
    priority: PRIORITIES.MEDIUM,
    requiredDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.product) newErrors.product = "Product Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.vendor) newErrors.vendor = "Vendor is required";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Valid quantity required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.requiredDate) newErrors.requiredDate = "Required Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        product: "",
        category: "",
        vendor: "",
        quantity: "",
        price: "",
        location: "",
        priority: "Medium",
        requiredDate: "",
        description: "",
      });
    }
  };

  const inputClass = "w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-white hover:border-slate-300 transition-all shadow-sm";
  const errorClass = "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/50 hover:border-rose-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className={cn(inputClass, errors.product && errorClass)}
            placeholder="e.g. Dell XPS 15 Laptops"
          />
          {errors.product && <p className="mt-1.5 text-xs text-rose-500">{errors.product}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={cn(inputClass, errors.category && errorClass)}
          >
            <option value="">Select Category...</option>
            <option value={CATEGORIES.HARDWARE}>Hardware</option>
            <option value={CATEGORIES.SOFTWARE}>Software</option>
            <option value={CATEGORIES.FURNITURE}>Furniture</option>
            <option value={CATEGORIES.SERVICES}>Services</option>
          </select>
          {errors.category && <p className="mt-1.5 text-xs text-rose-500">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Vendor</label>
          <input
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            className={cn(inputClass, errors.vendor && errorClass)}
            placeholder="e.g. Dell Technologies"
          />
          {errors.vendor && <p className="mt-1.5 text-xs text-rose-500">{errors.vendor}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={cn(inputClass, errors.quantity && errorClass)}
              placeholder="0"
            />
            {errors.quantity && <p className="mt-1.5 text-xs text-rose-500">{errors.quantity}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Unit Price (₹)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={cn(inputClass, errors.price && errorClass)}
              placeholder="0.00"
            />
            {errors.price && <p className="mt-1.5 text-xs text-rose-500">{errors.price}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={cn(inputClass, errors.location && errorClass)}
          >
            <option value="">Select Location...</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Remote">Remote</option>
          </select>
          {errors.location && <p className="mt-1.5 text-xs text-rose-500">{errors.location}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={inputClass}
            >
              <option value={PRIORITIES.LOW}>Low</option>
              <option value={PRIORITIES.MEDIUM}>Medium</option>
              <option value={PRIORITIES.HIGH}>High</option>
              <option value={PRIORITIES.CRITICAL}>Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Required Date</label>
            <input
              type="date"
              name="requiredDate"
              value={formData.requiredDate}
              onChange={handleChange}
              className={cn(inputClass, errors.requiredDate && errorClass)}
            />
            {errors.requiredDate && <p className="mt-1.5 text-xs text-rose-500">{errors.requiredDate}</p>}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (Optional)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className={inputClass}
          placeholder="Add any additional context or requirements..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-5 border-t border-slate-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all shadow-sm"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 transition-all shadow-sm"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}
