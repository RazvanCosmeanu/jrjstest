import React, { Component } from 'react';

export default class GridList extends Component {
  renderRow(row) {
    return row.map(this.props.renderItem);
  }

  renderContent(array) {
    const unchunkedLength = array.length;
    const chunked = [];
    const chunkSize = this.props.rowSize;

    for (let i = 0; i < unchunkedLength; i += chunkSize) {
      chunked.push(array.slice(i, i + chunkSize));
    }

    return chunked.map((row, index) => (
      <div key={index} className="row">
        {this.renderRow(row)}
      </div>
    ));
  }

  render() {
    return this.renderContent(this.props.list);
  }
}
