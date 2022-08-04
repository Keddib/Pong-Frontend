import Check from "assets/icons/check.svg";
import Xmark from "assets/icons/xmark.svg";
import { useState, useEffect } from "react";
import { Spinner } from "components/Loading";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";
import user1 from "config/user";

function FriendListItems() {
  return (
    <ElementBar rank={-1}>
      <div className="w-full flex justify-between items-center">
        <UserCard user={user1} />
        <div className="flex items-center sm:gap-8 sm:mr-8">
          <button className="rounded-full hover:bg-red/10 p-[2px]">
            <Xmark className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-red ease-in duration-150" />
          </button>
          <button className="rounded-full hover:bg-electricGreen/10 p-[2px]">
            <Check className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-electricGreen ease-in duration-150" />
          </button>
        </div>
      </div>
    </ElementBar>
  );
}

export default function FriendRequests() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const TO = setTimeout(() => {
      setDone(true);
    }, 1000);

    return () => {
      clearTimeout(TO);
    };
  }, []);

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {done ? <FriendListItems /> : <Spinner />}
    </ul>
  );
}
