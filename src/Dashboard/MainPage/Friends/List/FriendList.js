import UserBar from "../../../../Components/UserBar";
import User from "../../../../../public/assets/images/signin.png";

var user1 = {
  id: "123",
  img: User,
  name: "AlaeOX7",
  status: "Online",
  dot: "red-dot",
};

var users = [user1, user1, user1];

for (let i = 0; i < 10; i++) users.push(user1);

const List = () => {
  return (
    <ul className=" rounded-3xl flex flex-col items-end gap-1">
      {users.map((user) => {
        return (
          <UserBar key={Math.random()} user={user} settings={user.settings} />
        );
      })}
    </ul>
  );
};

export default List;
