import UserCard from "/src/Components/UserCard";
import useAuth from "/src/Hooks/useAuth";

function Result() {
  return (
    <div className="flex items-center gap-4 md:gap-8">
      <p className="text-pictonBlue text-xl font-bold">10</p>
      <p className="text-xl font-bold">VS</p>
      <p className="text-crayola text-xl font-bold">7</p>
    </div>
  );
}


const GameResult = () => {

  let { user } = useAuth();

  return (
    <div className="top-game flex flex-col md:flex-row md:gap-8 justify-center items-center gap-4 py-4">
      <UserCard user={user} />
      <Result />
      <UserCard user={user} />
    </div>
  );
}

export default GameResult;
