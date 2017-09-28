import React, { Component } from 'react';

import './MovieCard.css';

class MovieCard extends Component {
  imageBaseUrl = 'http://image.tmdb.org/t/p/w320';

  constructor(props) {
    super(props);
    this.state = {
      imageStatus: 'loading'
    };
  }

  onImageLoad(e) {
    this.setState({ imageStatus: 'loaded' });
  }

  onImageError(e) {
    this.setState({ imageStatus: 'failed' });
  }

  componentWillMount() {
    // this.props.moviesStore.loadMovies();
  }

  componentDidMount() {
  }

  render() {
    const { id, img, title } = { ...this.props.movie };
    const imageSrc = `${this.imageBaseUrl}${img}`;

    return (
      <div className="Card">
        <div className="Card-inner">
          <div className="Card-title">{title}</div>
          <img
            id={id}
            className="Card-img"
            src={imageSrc}
            alt={title}
            width="320"
            height="180"
            onLoad={this.onImageLoad.bind(this)}
            onError={this.onImageError.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default MovieCard;
