import UserCard from "components/Usercard";
import Logo from "components/Logo";
import { FunctionComponent } from "react";
import { User } from "types/user";
import LoadingPlayer from "./components/LoadingUser";

type Props = {
  user: User;
  opponent: User | null;
  setGameState: (state: string) => void;
};

const Waiting: FunctionComponent<Props> = ({
  opponent,
  user,
  setGameState
}) => {
  return (
    <div className="m-auto w-full pt-8 flex flex-col items-center gap-10">
      <Logo link="" className="animate-bounce" />
      <p className="text-xl font-poppins">wating for opponent...</p>
      <div className="players flex flex-col gap-10 sm:flex-row items-center">
        <UserCard user={user} />
        <h3 className="text-crayola font-light">VS</h3>
        {opponent ? <UserCard user={opponent} /> : <LoadingPlayer />}
      </div>
      <button
        onClick={() => setGameState("canceled")}
        className="button--5 w-40"
      >
        cancel
      </button>
    </div>
  );
};

export default Waiting;
