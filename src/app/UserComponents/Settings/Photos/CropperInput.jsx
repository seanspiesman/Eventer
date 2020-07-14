import React, { Component } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

class CropperInput extends Component {
  cropper = React.createRef();

  cropImage = () => {
    const { setImage } = this.props;
    if (typeof this.cropper.current.getCroppedCanvas() === "undefined") {
      return;
    }
    this.cropper.current.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg/png");
  };

  render() {
    const { imagePreview } = this.props;
    return (
      <Cropper
        ref={this.cropper}
        src={imagePreview}
        style={{ height: 200, width: "100%" }}
        preview=".img-preview"
        aspectRatio={1}
        viewMode={1}
        dragMode="move"
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage}
      />
    );
  }
}

export default CropperInput;
