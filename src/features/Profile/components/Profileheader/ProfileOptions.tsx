import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

const ProfileOptions: FunctionComponent<{
  rules: "me" | "friend" | "requested" | "none";
}> = ({ rules }) => {
  if (rules == "me") {
    return (
      <NavLink
        to="edit"
        className="button--3 px-4 text-sm md:px-8 md:text-xl"
        end
      >
        edit profile
      </NavLink>
    );
  } else if (rules == "friend") {
    return <h1>friend</h1>;
  } else if (rules == "requested") {
    return <h1>request sent</h1>;
  } else if (rules == "none") {
    return <h1>add friend</h1>;
  }
  return <></>;
};

export default ProfileOptions;
