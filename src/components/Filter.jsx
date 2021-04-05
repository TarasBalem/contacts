import React from "react";

const Filter = ({filter, updateFilter}) => {
  return (
    <div className="col-4 p-0">
      <input
        type="text"
        value={filter}
        onChange={updateFilter}
        placeholder="Search"
        className="form-control"
      />
    </div>
  );
};

export default Filter;
