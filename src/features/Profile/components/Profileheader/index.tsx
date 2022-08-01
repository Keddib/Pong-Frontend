import Star from "assets/icons/star.svg";
import { NavLink } from "react-router-dom";
import Image from "components/Image";
import { FunctionComponent } from "react";
import { User } from "types/app";

const ExStar: FunctionComponent<{ className: string }> = (props) => {
  return (
    <div className={`w-fit ${props.className}`}>
      <Star className="fill-crayola w-10 md:w-14" />
      <p className=" font-beaufort font-semibold text-md md:text-2xl absolute top-[8px] left-[11px] md:top-[10px] md:left-[12px]">
        14
      </p>
    </div>
  );
};

const ProfileHeader: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <header className="bg-queenBlue/50 rounded-2xl p-2 md:px-8 md:py-12 relative flex">
      <div className="left-side flex items-center gap-4 md:gap-8">
        <div className="rounded-full bg-queenBlue/50 relative">
          <ExStar className="absolute  -right-2 bottom-0" />
          <div className="w-20 h-20 md:w-40 md:h-40 rounded-full overflow-hidden">
            <Image
              imageUrl={user.avatar}
              alt="user profile"
              className="rounded-full"
            />
          </div>
        </div>
        <div>
          <h4 className="md:text-3xl">{user.username}</h4>
          <p className="md:text-xl">{user.username}</p>
        </div>
      </div>
      <div className="grow"></div>
      <div className="right-side self-end">
        {user.rules == "me" && (
          <NavLink
            to="edit"
            className="button--3 px-4 text-sm md:px-8 md:text-xl"
          >
            edit profile
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default ProfileHeader;
