import { useState, useEffect } from "react";
import Loading from "/src/Components/Loading";
import ElementBar from "/src/Components/ElementBar";
import UserCard from "/src/Components/UserCard";


const userExample = {
  username: 'AlaeZx07',
  id: 121878,
}




function FriendListItems() {
  return (
    <ElementBar >
      <div className="w-full flex justify-between items-center">
        <UserCard user={userExample} />
        <div className="flex items-center gap-8">
          <button className="bg-red rounded-full" >a1</button>
          <button className="bg-red rounded-full" >a2</button>
        </div>
      </div>

    </ElementBar>
  );
}

export default function FriendRequests() {

  let [done, setDone] = useState(false);

  useEffect(() => {

    const TO = setTimeout(() => {
      setDone(true);
    }, 1000);

    return () => { clearTimeout(TO); };
  }, [])

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {done ? <FriendListItems /> : <Loading />}
    </ul>
  );
}
