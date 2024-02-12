import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="search.."
    />
  );
};

export default Search;
