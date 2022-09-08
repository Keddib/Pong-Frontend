import { FunctionComponent } from "react";
import { User } from "types/app";

const SelectFriends: FunctionComponent<{ friends: User[] }> = ({ friends }) => {
  return (
    <>
      <div className="border-b h-fit max-h-[200px] border-b-queenBlue overflow-auto no-scrollbar">
        <ul className="h-fit">
          {friends.length ? (
            <>
              {friends.map((friend) => (
                <li key={friend.uid} className="mb-1">
                  <SelectFriend user={friend} />
                </li>
              ))}
            </>
          ) : (
            <p className="text-center">no friends found</p>
          )}
        </ul>
      </div>
    </>
  );
};

const SelectFriend: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <label htmlFor={user.username} className="input-container">
      <div className="flex items-center">
        <div className="w-10 h-10">
          <img src={user.avatar} alt="user" className="rounded-full" />
        </div>
        <div className="group-hover:text-lotion/70 ml-2">
          <h4 className="text-sm">{user.nickname}</h4>
          <p className="text-[10px]">{user.username}</p>
        </div>
      </div>
      <input
        name="friend"
        id={user.username}
        type="checkbox"
        value={user.uid}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default SelectFriends;
