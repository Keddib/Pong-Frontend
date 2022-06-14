import NavBar from "./Navbar/NavBar";
// import Loading from "../Components/Loading"

const Dashboard = () => {
  return (
    <div className="w-full h-full bg-spaceCadet/50 flex">
      <NavBar />
      {/* <Loading /> */}
      <div className="h-full w-full flex justify-center flex-col"></div>
    </div>
  );
};

export default Dashboard;
