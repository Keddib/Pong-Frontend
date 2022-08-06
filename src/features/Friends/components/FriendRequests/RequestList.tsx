import Check from "assets/icons/check.svg";
import Xmark from "assets/icons/xmark.svg";
import { FunctionComponent } from "react";
import { User } from "types/app";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";

const RequestListItem: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <ElementBar rank={-1}>
      <div className="w-full flex justify-between items-center">
        <UserCard user={user} />
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
};

const RequestList: FunctionComponent<{ requests: User[] }> = ({ requests }) => {
  const requestsArray = requests.map((request) => (
    <li key={request.id}>
      <RequestListItem user={request} />
    </li>
  ));

  return (
    <>
      {requestsArray.length ? (
        <>{requestsArray}</>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>no friend requests</p>
        </div>
      )}
    </>
  );
};

export default RequestList;
