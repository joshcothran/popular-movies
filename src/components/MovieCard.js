import React, { Component } from 'react';

import './MovieCard.css';

class MovieCard extends Component {
  imageBaseUrl = 'http://image.tmdb.org/t/p/w320';

  constructor(props) {
    super(props);
  }

  onImageLoad(e) {
    if (this.refs.cardImg !== null) {
      this.refs.cardImg.className = 'Card-image Card-image-loaded';
    }
    if (this.refs.cardTitle !== null) {
      setTimeout(() => {
        this.refs.cardTitle.className = 'Card-title Card-title-loaded';
      }, 500);
    }
  }

  onImageError(e) {
    console.error('Image load failed');
  }

  render() {
    const { id, img, title } = { ...this.props.movie };
    const imageSrc = `${this.imageBaseUrl}${img}`;

    return (
      <div className="Card">
        <div className="Card-inner">
          <div
            ref="cardTitle"
            className="Card-title Card-title-loading">
            {title}
          </div>
          <div className="Card-inner-image">
            <img
              ref="cardImg"
              id={id}
              className="Card-img Card-image-loading"
              src={imageSrc}
              alt={title}
              width="320"
              height="180"
              onLoad={this.onImageLoad.bind(this)}
              onError={this.onImageError.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
