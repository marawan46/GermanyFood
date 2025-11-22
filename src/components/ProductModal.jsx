import { X } from "lucide-react";
import React from "react";

export default function ProductModal({ id, setVisable, product }) {
    if(product==null)return
  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
        onClick={()=>setVisable(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white relative rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={()=>setVisable(false)}
            className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {product?.image && (
            <div className="h-64 md:h-80 bg-gray-100">
              <img
                src={product.image}
                alt={product.title || "Product"}
                className="w-full h-full aspect-[9/16] object-contain"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Title */}
            {product?.title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h2>
            )}

            {/* Description */}
            {product?.description && (
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
