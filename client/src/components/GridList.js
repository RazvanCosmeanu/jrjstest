import React, { Component } from 'react';

import chunkArray from '../chunkArray';

export default class GridList extends Component {
  renderRow(row) {
    return row.map(this.props.renderItem);
  }

  renderContent(array) {
    const chunked = chunkArray(array, this.props.rowSize);

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
