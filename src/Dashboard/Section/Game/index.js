import UserCard from "/src/Components/UserCard";

function LoadingPlayer() {
  return (
    <div className="w-44 flex items-center">
      <div className="rounded-full w-16 h-16 bg-queenBlue/50 mr-2"></div>
      <div className="grow flex flex-col gap-1">
        <div className="rounded-3xl h-4 w-full bg-queenBlue"></div>
        <div className="rounded-3xl h-3 w-2/3 bg-queenBlue"></div>
      </div>
    </div>
  );
}


export default function Game(props) {

  return (
    <div className="game-layout boreder w-full h-full">
      <LoadingPlayer />
    </div>
  );

}
