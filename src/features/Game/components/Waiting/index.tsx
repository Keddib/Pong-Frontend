import UserCard from "components/Usercard";
import Logo from "components/Logo";
import { FunctionComponent } from "react";
import { User } from "types/app";

import user1 from "config/user";
import useAuth from "~/src/hooks/useAuth";

function LoadingPlayer() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full w-16 h-16 bg-queenBlue/70"></div>
      <div className="flex-1 space-y-2 pt-2">
        <div className="h-4 w-24 bg-queenBlue/70 rounded-2xl"></div>
        <div className="w-16">
          <div className="h-[12px] bg-queenBlue/70 rounded-2xl col-span-1"></div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  opponent: User;
  setGameState: (state: string) => void;
};

const Waiting: FunctionComponent<Props> = ({ opponent, setGameState }) => {
  const { user } = useAuth();

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
