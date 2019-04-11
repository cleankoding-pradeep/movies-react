import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    let selectedColumn = { ...this.props.sortColumn };
    if (selectedColumn.path === path) {
      selectedColumn.order = selectedColumn.order === "asc" ? "desc" : "asc";
    } else {
      selectedColumn.path = path;
      selectedColumn.order = "asc";
    }
    this.props.onSort(selectedColumn);
  };
  renderSortIcon = column => {
    let selectedColumn = { ...this.props.sortColumn };
    if (column.path !== selectedColumn.path) return null;
    if (selectedColumn.order === "asc")
      return <i className="fa fa-sort-asc" aria-hidden="true" />;
    return <i className="fa fa-sort-desc" aria-hidden="true" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
