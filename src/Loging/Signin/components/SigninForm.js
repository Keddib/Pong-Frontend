const SigninForm = () => {
  return (
    <form>
      <label htmlFor="Username" className="label-dark">
        <span className="input--span">Username</span>
        <input
          id="Username"
          type="Username"
          placeholder="Username"
          className="input--1"
        />
      </label>
      <label htmlFor="Password" className="label-dark">
        <span className="input--span">Password</span>
        <input
          id="Password"
          type="Password"
          placeholder="Password"
          className="input--1"
        />
      </label>
      <button className="button--1 mt-6" type="submit">
        Signin
      </button>
    </form>
  );
};

export default SigninForm;
