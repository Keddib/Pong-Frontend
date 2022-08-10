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
    return (
      <button className="button--3 px-4 text-sm md:px-8 md:text-xl">
        friend
      </button>
    );
  } else if (rules == "requested") {
    return <h1>request sent</h1>;
  }
  return (
    <button className="button--3 px-4 text-sm md:px-8 md:text-xl">
      add friend
    </button>
  );
};

export default ProfileOptions;
