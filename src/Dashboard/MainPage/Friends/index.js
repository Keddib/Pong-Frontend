import { Outlet, Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="Dash-main border">
      <div className="w-full h-full rounded-t-3xl pt-4 flex flex-col gap-4">
        <div className=" bg-queenBlue rounded-3xl flex justify-evenly items-center">
          <Link to="" className="text-lotion/50 hover:text-lotion py-3">
            <h4>Friends</h4>
          </Link>
          <div className="w-1 h-8 rounded-lg  bg-pictonBlue"></div>
          <Link to="requests" className=" text-lotion/50 hover:text-lotion">
            <h4>Requests</h4>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
