import { Link } from "react-router-dom";

const IconWrap = ({ icon, page, callBack, active }) => {
  if (active) console.log("true profile active");
  return (
    // change to Link later
    <Link
      onClick={callBack}
      to={page ? page : ""}
      className="icon-wrapper group"
    >
      <div className={`icon-line ${active ? "bg-red hover:bg-red" : ""}`}></div>
      <div className="icon-div"> {icon} </div>
    </Link>
  );
};

export default IconWrap;
