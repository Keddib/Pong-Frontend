import Star from "assets/icons/star.svg";
import { FunctionComponent } from "react";
import { levelFactor } from "config/index";
import { User } from "types/app";

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
          <div
            className="bg-crayola h-3 rounded-3xl"
            style={{
              width:
                (((user.xp / (user.level * levelFactor)) * 100).toString() ||
                  "0") + "%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UserStarXP;
