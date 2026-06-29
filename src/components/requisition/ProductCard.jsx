import { ShoppingCart, Star, Laptop } from "lucide-react";
import { memo } from "react";
import { cn } from "../../utils/cn";
import ImageWithFallback from "../common/ImageWithFallback";
import { STATUS } from "../../constants/status";
import { formatCurrency } from "../../utils/helpers";

const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-0.5">
      <div className="h-44 bg-slate-50/50 flex items-center justify-center border-b border-slate-100 relative group-hover:bg-slate-50 transition-colors overflow-hidden">
        {product.image ? (
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full !object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            fallbackIconClassName="w-12 h-12"
          />
        ) : (
          <Laptop className="w-16 h-16 text-slate-300 group-hover:text-blue-500/80 transition-colors duration-300" />
        )}
        <div className="absolute top-3 right-3 z-10">
          <span className={cn(
            "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-sm",
            product.availability === STATUS.IN_STOCK ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
            product.availability === STATUS.LOW_STOCK ? "bg-amber-50 text-amber-700 border-amber-200" :
            "bg-rose-50 text-rose-700 border-rose-200"
          )}>
            {product.availability}
          </span>
        </div>
      </div>
      
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">{product.vendor}</p>
          </div>
          <div className="flex items-center bg-amber-50/50 border border-amber-100 px-1.5 py-0.5 rounded-md shrink-0 ml-2">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
            <span className="text-[11px] font-semibold text-amber-700">{product.rating}</span>
          </div>
        </div>

        <ul className="mt-3 space-y-1.5 mb-4 flex-1">
          {product.specs.map((spec, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-center">
              <span className="w-1 h-1 bg-slate-300 rounded-full mr-2"></span>
              {spec}
            </li>
          ))}
        </ul>

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-100">
          <div>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">Price</p>
            <p className="text-lg font-bold text-slate-900 tracking-tight">
              {formatCurrency(product.price)}
            </p>
          </div>
          
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={cn(
              "flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm",
              isOutOfStock 
                ? "bg-slate-100 text-slate-400 border border-slate-200 opacity-70" 
                : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
            )}
          >
            <ShoppingCart className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
