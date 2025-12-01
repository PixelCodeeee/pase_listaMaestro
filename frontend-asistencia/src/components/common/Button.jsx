import React from 'react';
import './Button.css';

export default function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary', // primary, secondary
  fullWidth = true 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`}
    >
      {children}
    </button>
  );
}