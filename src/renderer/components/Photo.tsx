import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types'
import { readFile } from '../../helpers/images';

export default function Photo() {
  const [imageSrc, setImageSrc] = useState(null); // file data
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [filename, setFilename] = useState(null); // file address
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((croppedArea:Area, _croppedAreaPixels:Area) => {}, [])
  const handleFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length) {
      // we got a file
      const file = e.target.files[0];
      // console.log(e.target.file[0])
      setFilename(file.path);
      //get the image data from the file
      const imageData: any = await readFile(file);
      // setImageSrc to that imahe data
      setImageSrc(imageData);
    }
  };
  if (!imageSrc) {
    return (
      <>
        <h1>Please choose photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </>
    );
  }

  const handleSave = () => {
    // first save the cropped image

    // then reset the interface
    setImageSrc(null)
    setZoom(1)
    setCrop({x:0, y:0})
  }
  if(!imageSrc) {

  }
  return (
    <>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete} //
      />
      <button className='save-btn' onClick={ handleSave }>Save</button>
    </>
  );
}
