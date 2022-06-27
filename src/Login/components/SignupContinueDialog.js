import { useState, useEffect } from "react";
import Dialog from "./Dialog";
import useAuth from "/src/Hooks/useAuth";

const title = {
  primary: "welcome to",
  secondary: "enter nickname and change your picture"
};


const ContinueDialog = () => {

  let [error, setError] = useState(false);
  let { user } = useAuth();
  let [img, setImg] = useState(user.image_url);

  async function submit(e) {
    e.preventDefault();
    let nickName = e.target.elements.nickName.value;
    let userImage = e.target.elements.userImage.files[0];
    if (nickName.length > 35 || nickName.length == 0) {
      return setError(true);
    }
    // get data to send wiith respone
    const data = new FormData();
    data.append('nickName', nickName);
    data.append('userImage', userImage, 'user.jpg');
    // send response to update user

    // navigate to home page
    // user.isNew = false;
  }

  useEffect(() => {
    setImg(user.image_url);
  }, [user]);

  return (
    <Dialog title={title}>
      <form className="flex flex-col gap-8 pt-4" onSubmit={submit} >
        <label htmlFor="photo" className="flex items-center gap-2">
          <div className="shrink-0 inline">
            <img className="h-16 w-16 object-cover rounded-full" src={img} alt="Current profile" />
          </div>
          <span className="sr-only">Choose profile photo</span>
          <input
            onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            id="userImage"
            type="file"
            className="profile-picture-input"
          />
        </label>
        <label htmlFor="nickName" className="block font-poppins capitalize " noValidate>
          <span className="text-lotion">
            Nickname
          </span>
          <input
            id='nickName'
            placeholder='nickname'
            type='text'
            className="input--2 text-lotion border border-lotion placeholder-lotion/50"
          />
        </label>
        {error && <p className="text-red/70">nickname is required , max length is 35</p>}
        <button type="submit" className="button--2">
          continue
        </button>
      </form>
    </Dialog>
  );
}

export default ContinueDialog;
