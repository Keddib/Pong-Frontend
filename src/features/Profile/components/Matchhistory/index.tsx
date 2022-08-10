import { FunctionComponent } from "react";
import { Game } from "types/app";
import GameResult from "../Gameresult";

const MatchHistory: FunctionComponent<{ games: Game[] }> = ({ games }) => {
  const gamesElem = (function getgames() {
    if (games?.length) {
      return games.map((game) => {
        console.log(game);
        return <GameResult key={game.id} game={game} />;
      });
    }
    return <p>no games found</p>;
  })();

  return (
    <div className="rounded-2xl bg-spaceCadet p-2 md:p-4 flex flex-col gap-2">
      <h2 className="mb-2 capitalize text-xl md:text-3xl">match History</h2>
      <ul className="flex flex-col gap-2">{gamesElem}</ul>
    </div>
  );
};

export default MatchHistory;
