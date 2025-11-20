import React from "react";

export default function TextModal({ id, title, children }) {
  return (
    <>
      {/* Hidden checkbox toggle */}
      <input type="checkbox" id={id} className="modal-toggle" />
      
      <div className="modal">
        <div className="modal-box relative max-w-lg">
          {/* Close Button */}
          <label htmlFor={id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          
          {/* Modal Title */}
          <h3 className="font-bold text-lg mb-4">{title}</h3>
          
          {/* Modal Content */}
          <div className="text-sm whitespace-pre-line">{children}</div>
        </div>
      </div>
    </>
  );
}
