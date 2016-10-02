import React from "react";
import Pagination from "./Pagination.jsx";

const ResourceListPage = (props) => {
  return (
    <div className = {props.className}>
      {props.paginate ? React.createElement(Pagination, props.paginationProps) : null}
      {React.createElement(props.containerComponent, {className: "resource-list"}, props.listElements)}
      {props.paginate ? React.createElement(Pagination, props.paginationProps) : null}
    </div>
  );
}

export default ResourceListPage;
