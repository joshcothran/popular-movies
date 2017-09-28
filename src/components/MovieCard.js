import React, { Component } from 'react';

import './MovieCard.css';

class MovieCard extends Component {
  imageBaseUrl = 'http://image.tmdb.org/t/p/w320';

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      imageLoaded: false
    });
  }

  onCardOver() {
    if (this.refs.cardInner !== null && this.state.imageLoaded) {
      this.refs.cardInner.className = 'Card-inner Card-inner-over';
    }
  }

  onCardOut() {
    if (this.refs.cardInner !== null && this.state.imageLoaded) {
      this.refs.cardInner.className = 'Card-inner Card-inner-out';
    }
  }

  onImageLoad() {
    this.state.imageLoaded = true;
    if (this.refs.cardImg !== null) {
      this.refs.cardImg.className = 'Card-image Card-image-loaded';
    }
    if (this.refs.cardTitle !== null) {
      setTimeout(() => {
        this.refs.cardTitle.className = 'Card-title Card-title-loaded';
      }, 500);
    }
  }

  onImageError() {
    console.error('Image load failed');
  }

  render() {
    const { id, img, title } = { ...this.props.movie };
    const imageSrc = `${this.imageBaseUrl}${img}`;

    return (
      <div className="Card">
        <div
          ref="cardInner"
          className="Card-inner"
          onMouseOver={this.onCardOver.bind(this)}
          onMouseOut={this.onCardOut.bind(this)}>
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
              onError={this.onImageError.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
