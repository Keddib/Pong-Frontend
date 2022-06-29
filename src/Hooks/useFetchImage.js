import axios from "axios";
import { useEffect, useState } from "react";


export default function App(imageUrl) {
  const [img, setImg] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      let imageBlob
      try {
        imageBlob = (await axios.get(imageUrl, { responseType: 'blob' })).data;
      } catch (err) {
        return null
      }
      console.log(imageBlob);
      let imageObjectURL = URL.createObjectURL(imageBlob);
      console.log(imageObjectURL);
      setImg(imageObjectURL);
    };
    fetchImage();
  }, [imageUrl]);

  return img;
}
