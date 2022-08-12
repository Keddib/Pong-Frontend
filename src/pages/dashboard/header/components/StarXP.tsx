import Star from "assets/icons/star.svg";
import { User } from "types/app";
import { FunctionComponent } from "react";

const UserStarXP: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <div className="EX">
      <div className="star w-14 relative mr-4 flex justify-center items-center p-0">
        <Star className="fill-crayola w-14 absolute top-0 left-0 -z-1" />
        <p className=" font-beaufort font-semibold text-xl z-10">
          {user.level}
        </p>
      </div>
      <div className="flex flex-col justify-center grow ">
        <p>{`${user.xp} xp`}</p>
        <div className="w-full h-3 rounded-3xl bg-lotion/50">
          <div className="w-[0] bg-crayola h-3 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default UserStarXP;
