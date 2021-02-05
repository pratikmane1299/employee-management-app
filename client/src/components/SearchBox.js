import React from "react";

const SearchBox = React.forwardRef(
  ({ name, placeholder, value, onChange }, ref) => (
    <input
      type="text"
      name={name}
      autoFocus
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
);

export default SearchBox;
