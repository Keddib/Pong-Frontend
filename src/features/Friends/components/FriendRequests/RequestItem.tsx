import Check from "assets/icons/check.svg";
import Xmark from "assets/icons/xmark.svg";
import { FunctionComponent } from "react";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { User } from "types/app";

const RequestListItem: FunctionComponent<{
  user: User;
  ReqUid: string;
  removeReq: (uid: string) => void;
}> = ({ user, ReqUid, removeReq }) => {
  const axiosPrivate = useAxiosPrivate();
  function hundleAccepteRequest(ReqUid: string) {
    try {
      axiosPrivate.post("/friends/accept", {
        uid: ReqUid,
        status: true,
      });
    } catch (err) {
      return false;
    }
    removeReq(ReqUid);
    return true;
  }

  function hundleCancelRequest(ReqUid: string) {
    try {
      axiosPrivate.post("/friends/decline", {
        uid: ReqUid,
      });
    } catch (err) {
      return false;
    }
    removeReq(ReqUid);
    return true;
  }

  return (
    <ElementBar rank={-1}>
      <div className="w-full flex justify-between items-center">
        <UserCard user={user} />
        <div className="flex items-center sm:gap-8 sm:mr-8">
          <button
            className="rounded-full hover:bg-red/10 p-[2px]"
            onClick={() => {
              hundleCancelRequest(ReqUid);
            }}
          >
            <Xmark className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-red ease-in duration-150" />
          </button>
          <button
            className="rounded-full hover:bg-electricGreen/10 p-[2px]"
            onClick={() => {
              hundleAccepteRequest(ReqUid);
            }}
          >
            <Check className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-electricGreen ease-in duration-150" />
          </button>
        </div>
      </div>
    </ElementBar>
  );
};
export default RequestListItem;
