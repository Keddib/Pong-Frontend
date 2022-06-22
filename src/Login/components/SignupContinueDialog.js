import { useState } from "react";
import Dialog from "./Dialog";


const SigninDialog = () => {

  let [error, setError] = useState(false);
  const title = {
    primary: "welcome to",
    secondary: "enter nickname and change photo"
  };

  function submit(e) {
    e.preventDefault();
    console.log('submit');
    let nickname = e.target.elements.nickname.value;
    if (nickname.length > 35 || nickname.length == 0) {
      setError(true);
      return;
    }
    console.log(e.target.elements.nickname.value); // from elements property
  }

  return (
    <Dialog title={title}>
      <form className="flex flex-col gap-8 pt-4" onSubmit={submit}>
        <label htmlFor="photo" className="flex items-center gap-2">
          <div className="shrink-0 inline">
            <img className="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile" />
          </div>
          {/* <span className="sr-only text-lotion/50 border border-red">Choose profile photo</span> */}
          <input id="userImage" type="file" className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm
      file:bg-lotion/50
      hover:file:bg-lotion cursor-pointer file:text-spaceCadet
    "/>
        </label>
        <label htmlFor="nickname" className="block font-poppins capitalize " noValidate>
          <span className="text-lotion">
            Nickname
          </span>
          <input
            id='nickname'
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

export default SigninDialog;
