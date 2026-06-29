import { useState, memo } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const ImageWithFallback = memo(function ImageWithFallback({ src, alt, className, fallbackIconClassName, ...props }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden bg-slate-100 flex items-center justify-center", className)}>
      {loading && !error && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      {error ? (
        <div className="flex flex-col items-center justify-center text-slate-400">
          <ImageIcon className={cn("w-8 h-8", fallbackIconClassName)} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover transition-opacity duration-300", loading ? "opacity-0" : "opacity-100", className)}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          {...props}
        />
      )}
    </div>
  );
});

export default ImageWithFallback;
