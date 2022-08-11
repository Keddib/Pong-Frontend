import Check from "assets/icons/check.svg";
import Xmark from "assets/icons/xmark.svg";
import { FunctionComponent, useState } from "react";
import { FriendRequest, User } from "types/app";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";

const RequestListItem: FunctionComponent<{ user: User; ReqUid: string }> = ({
  user,
  ReqUid,
}) => {
  const [isDone, setDone] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  function hundleAccepteRequest(ReqUid: string) {
    console.log("req", ReqUid);
    try {
      axiosPrivate.post("/friends/accept", {
        uid: ReqUid,
        status: true,
      });
    } catch (err) {
      return false;
    }
    return true;
  }

  function hundleCancelRequest(ReqUid: string) {
    console.log("req", ReqUid);
    try {
      axiosPrivate.post("/friends/decline", {
        uid: ReqUid,
      });
    } catch (err) {
      return false;
    }
    return true;
  }

  return (
    <ElementBar rank={-1}>
      <div className="w-full flex justify-between items-center">
        <UserCard user={user} />
        <div className="flex items-center sm:gap-8 sm:mr-8">
          {isDone ? (
            <p>done</p>
          ) : (
            <>
              <button
                className="rounded-full hover:bg-red/10 p-[2px]"
                onClick={() => {
                  setDone(hundleCancelRequest(ReqUid));
                }}
              >
                <Xmark className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-red ease-in duration-150" />
              </button>
              <button
                className="rounded-full hover:bg-electricGreen/10 p-[2px]"
                onClick={() => {
                  setDone(hundleAccepteRequest(ReqUid));
                }}
              >
                <Check className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-electricGreen ease-in duration-150" />
              </button>
            </>
          )}
        </div>
      </div>
    </ElementBar>
  );
};

const RequestList: FunctionComponent<{ requests: FriendRequest[] }> = ({
  requests,
}) => {
  const requestsArray = requests.map((request) => (
    <li key={request.uid}>
      <RequestListItem user={request.sender} ReqUid={request.uid} />
    </li>
  ));

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {requestsArray.length ? (
        <>{requestsArray}</>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>no friend requests</p>
        </div>
      )}
    </ul>
  );
};

export default RequestList;
