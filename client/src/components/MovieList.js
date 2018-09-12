import React, { Component } from 'react';

import GridList from './GridList';

export default class MovieList extends Component {
  renderEpisode = episode => {
    return (
      <div key={episode.id} className="col s12 m6 l3">
        <div className="card">
          <div className="card-image">
            <img src={episode.image.medium} alt={episode.name} />
          </div>
        </div>
        <span className="card-title">{episode.name}</span>
      </div>
    );
  };

  render() {
    const titleFilter = this.props.titleFilter;
    const episodes = this.props.episodes;

    const content = titleFilter
      ? episodes.filter(episode =>
          episode.name.toLowerCase().includes(titleFilter.trim().toLowerCase())
        )
      : episodes;

    return (
      <GridList list={content} rowSize={3} renderItem={this.renderEpisode} />
    );
  }
}
