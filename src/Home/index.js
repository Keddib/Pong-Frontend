import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>
        Landing
      </h1>
      <Link to="/home">home</Link> <br />
      <Link to="/access/signin">signin</Link> <br />
      <Link to="/access/signup">signup</Link> <br />
    </div>
  );
}

export default Home;
