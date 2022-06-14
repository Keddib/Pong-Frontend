import CameraIcon from "../../../../public/assets/icons/camera.svg";
const SignupForm = () => {
  return (
    <form>
      <label htmlFor="dropzone-file" className="flex items-center w-fit mb-4">
        <div className="group flex flex-col mr-4 justify-center items-center w-20 rounded-full border-2 border-lotion/50 border-dashed cursor-pointer hover:border-lotion">
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <CameraIcon className="w-8 fill-lotion/50 group-hover:fill-lotion" />
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </div>
        <span className="block text-base font-medium text-lotion">
          Add photo
        </span>
      </label>

      <label htmlFor="Username" className="label-light">
        <span className="input--span">Username</span>
        <input
          id="Username"
          type="Username"
          placeholder="Username"
          className="input--2"
        />
      </label>
      <label htmlFor="Password" className="label-light">
        <span className="input--span">Password</span>
        <input
          id="Password"
          type="Password"
          placeholder="Password"
          className="input--2"
        />
      </label>
      <button className="button--2 mt-6" type="submit">
        continue
      </button>
    </form>
  );
};

export default SignupForm;
