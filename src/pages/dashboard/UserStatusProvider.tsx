import { FunctionComponent, useState } from "react";
import UserStatusContext from "src/context/userStatus";
import { UserStatus } from "~/src/types/app";

const UserStatusProvider: FunctionComponent<{ children: JSX.Element[] }> = ({
  children,
}) => {
  const [userS, setUserS] = useState({} as UserStatus);

  function updateUserS(user: UserStatus) {
    setUserS(user);
  }

  const value = {
    userStatus: userS,
    updateUser: updateUserS,
  };

  return (
    <UserStatusContext.Provider value={value}>
      {children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusProvider;
