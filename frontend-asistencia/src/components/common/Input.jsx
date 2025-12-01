import React from 'react';
import './Input.css';

export default function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  required = false 
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="input-base"
    />
  );
}