import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Lightbox from 'react-image-lightbox';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      degree: 0,
      isOpen: false
    };
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
    
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }
  
  handleClickDelete(){
    const id = this.props.dto.id;
    const newImages = this.props.images.filter(image => image.id !== id);
    this.props.updateGallery(newImages);
  }
  handleClickRotate(){
    const id = this.props.dto.id;
    let degree = this.state.degree;
    this.props.images.filter(function(image){
        if(image.id === id){
          if(degree >= 360){
            degree = 90;
          }else{
            degree = degree+90;
          }
        }
      });
      console.log( this.props.images);
      this.setState({degree: degree});

  }

 
  handleClickExpand(){

  }

  render() {
    const { photoIndex, isOpen } = this.state;
    return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px',
          transform: `rotate(${this.state.degree}deg)`
        }}
        >
        <div style={{transform: `rotate(${-this.state.degree}deg)`}}>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.handleClickRotate.bind(this)}/>
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={this.handleClickDelete.bind(this)}/>
          <FontAwesome className="image-icon" name="expand" title="expand" data-lightbox="gallery" onClick={() => this.setState({ isOpen: true })}/>
          {isOpen && (
          <Lightbox
            mainSrc={`${this.urlFromDto(this.props.dto)}`}
            nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length]}
            prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        </div>
      </div>
    );
  }
}

export default Image;
