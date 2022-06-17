import { Link } from "react-router-dom";

const IconWrap = ({ icon, page, callBack }) => {
  return (
    // change to Link later
    <Link
      onClick={callBack}
      to={page ? page : ""}
      className="icon-wrapper group"
    >
      <div className="icon-line"></div>
      <div className="icon-div"> {icon} </div>
    </Link>
  );
};

export default IconWrap;
