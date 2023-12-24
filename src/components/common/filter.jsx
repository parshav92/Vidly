import React from "react";

const Filter = ({
  items,
  onGenreSelect,
  textProperty,
  valueProperty,
  selectedGenre,
}) => {
  return (
    <ul className="list-group">
      {items.map((genre) => (
        <li
          onClick={() => onGenreSelect(genre)}
          key={genre[valueProperty]} // Add unique key prop
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Filter;
