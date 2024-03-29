import UserCard from "components/Usercard";
import { FunctionComponent } from "react";
import { Game } from "types/app";

const Result: FunctionComponent<{ score: [number, number] }> = ({ score }) => {
  return (
    <div className="flex items-center gap-4 md:gap-8">
      <p className="text-pictonBlue text-sm md:text-xl font-bold">{score[0]}</p>
      <p className="text-sm md:text-xl font-bold">VS</p>
      <p className="text-crayola text-sm md:text-xl font-bold">{score[1]}</p>
    </div>
  );
};

const GameResult: FunctionComponent<{ game: Game }> = ({ game }) => {
  return (
    <li className="group bg-queenBlue/50 flex justify-between items-center rounded-xl border border-transparent hover:border-pictonBlue mb-1 py-1 ease-linear duration-100">
      <div className="group-hover:bg-pictonBlue w-1 mr-[1px] h-[25px] md:h-[45px] rounded-3xl"></div>
      <div className="top-game flex gap-2 md:gap-8 justify-center items-center">
        <UserCard user={game.playerOne} />
        <Result score={[game.scoreOne, game.scoreTwo]} />
        <UserCard user={game.playerTwo} />
      </div>
      <div className="group-hover:bg-pictonBlue w-1 ml-[1px] h-[25px] md:h-[45px] rounded-3xl"></div>
    </li>
  );
};

export default GameResult;
