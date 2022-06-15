import { Link } from "react-router-dom";

const IconWrap = ({ icon, page }) => {
  return (
    // change to Link later
    <Link to={page ? page : ""} className="icon-wrapper group">
      <div className="icon-line"></div>
      <div className="icon-div"> {icon} </div>
    </Link>
  );
};

export default IconWrap;
