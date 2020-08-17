import React from "react";

const MangaListItem = ({ title }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{title}</div>
    </li>
  );
};
export default MangaListItem;
