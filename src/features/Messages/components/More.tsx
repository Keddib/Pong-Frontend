import { FunctionComponent, useEffect, useState } from "react";
import { Conversation } from "types/app";
import ElementBar from "~/src/components/ElementBar";
import UserCard from "~/src/components/Usercard";
import useAuth from "~/src/hooks/useAuth";

const More: FunctionComponent<{ conv: Conversation }> = ({ conv }) => {
  const { user } = useAuth();
  const [userPosition, setUserPosition] = useState("");

  useEffect(() => {}, []);

  return (
    <div className="message-more">
      <h4>room info</h4>
      <p>
        {conv.name}, {conv.members.length} memeber
      </p>
      {/* if the user is admin
          show admin options
          add / update / delete password
          add / delete other admins
      */}
      <div className="messages-members rounded-3xl bg-queenBlue/50 py-2 px-1">
        <p> {conv.members.length} member</p>
        <ul className="flex-col flex gap-1">
          {conv.members.map((member) => {
            return (
              <li
                key={member.uid}
                className=" flex items-center justify-between"
              >
                <ElementBar rank={-1}>
                  <div className="w-full flex justify-between items-center">
                    <UserCard user={member} />
                    <p>admin</p>
                  </div>
                </ElementBar>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="message-more-button">
        <p className="text-red">leave room</p>
      </button>
      {/* if the user is owner
        delete room
      */}
    </div>
  );
};

export default More;
