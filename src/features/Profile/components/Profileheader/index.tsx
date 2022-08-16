import Star from "assets/icons/star.svg";
import Ellipsis from "assets/icons/ellipsis.svg";
import Xmark from "assets/icons/xmark.svg";
import Image from "components/Image";
import { FunctionComponent, useState } from "react";
import { useActor } from "@xstate/react";
import useProfileState from "../../hooks/useProfileState";
import ProfileOptions from "./ProfileOptions";
import Dropdown from "~/src/components/Dropdown";

const ExStar: FunctionComponent<{ lvl: number }> = (props) => {
  return (
    <div className="w-fit absolute right-0 bottom-0">
      <div className="relative w-10 md:w-14 flex justify-center items-center h-[36px] md:h-[50px]">
        <Star className="fill-crayola w-10 md:w-14 absolute top-0 left-0 -z-1" />
        <p className=" font-beaufort font-semibold text-md md:text-lg z-10">
          {props.lvl}
        </p>
      </div>
    </div>
  );
};

const ProfileHeader = () => {
  const profileService = useProfileState();
  const [state] = useActor(profileService);
  const user = state.context;

  return (
    <header className="bg-queenBlue/50 rounded-2xl p-2 md:px-8 md:py-12 relative flex">
      <div className="left-side flex items-center gap-4 md:gap-8">
        <div className="rounded-full bg-queenBlue/50 relative">
          <ExStar lvl={user.level} />
          <div className="w-20 h-20 md:w-40 md:h-40 rounded-full overflow-hidden">
            <Image
              imageUrl={user.avatar}
              alt="user profile"
              className="rounded-full"
            />
          </div>
        </div>
        <div>
          <h4 className="md:text-3xl">{user.nickname}</h4>
          <p className="md:text-xl">{user.username}</p>
        </div>
      </div>
      <div className="grow"></div>
      <div className="right-side self-end flex items-center gap-2">
        <ProfileOptions />
        {user.rule != "me" && <Actions />}
      </div>
    </header>
  );
};

const Actions = () => {
  const [show, setShow] = useState(false);

  function showDropDown() {
    setShow(!show);
  }

  return (
    <div className="relative">
      <button className="group bell-button" onClick={showDropDown}>
        <Ellipsis className="iconBell" />
      </button>
      {show && (
        <Dropdown className="w-fit">
          <>
            <div className=" flex justify-end">
              <button onClick={showDropDown}>
                <Xmark className="w-5 h-5 fill-lotion/50 hover:fill-lotion" />
              </button>
            </div>
            <>
              <p>option lklsdjfhdlskjfhd</p>
              <p>option lklsdjfhdlskjfhd</p>
              <p>option lklsdjfhdlskjfhd</p>
            </>
          </>
        </Dropdown>
      )}
    </div>
  );
};

export default ProfileHeader;
