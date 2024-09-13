import React from 'react';

const Input = ({ className, name, type, placeholder, onChange, value }) => (
    <input
        className={className}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
    />
);

export default Input;
