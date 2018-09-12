import React, { Component } from 'react';
import MovieList from './MovieList';

import fetchEpisodes from '../fetchEpisodes';

export default class App extends Component {
  state = {
    episodes: [],
    titleFilter: '',
    error: ''
  };

  componentDidMount() {
    this.userOpensApp();
  }

  userOpensApp = async () => {
    try {
      const episodes = await fetchEpisodes();
      this.setState({ episodes });
    } catch (e) {
      this.setState({ error: 'Failed to fetch episodes' });
    }
  };

  userTypes = event => {
    this.setState({
      titleFilter: event.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <form className="nav-wrapper container white-text">
              <input
                type="text"
                value={this.state.titleFilter}
                placeholder="Search for title..."
                onChange={this.userTypes}
              />
            </form>
          </nav>
        </div>

        <span>{this.state.error}</span>

        <div className="container">
          <MovieList
            episodes={this.state.episodes}
            titleFilter={this.state.titleFilter}
          />
        </div>
      </div>
    );
  }
}
