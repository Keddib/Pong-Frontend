import { Link } from "react-router-dom";
import ElementBar from "/src/Components/ElementBar";
import UserCard from "/src/Components/UserCard";
import useAuth from "/src/Hooks/useAuth";

// import { MD } from "/src/Components/Constants";
// import useMedia from "/src/Hooks/useMedia";

function Rooms() {

  // let md = useMedia(MD);
  let { user } = useAuth();

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">

      <div className="bg-queenBlue/50 rounded-2xl py-4 pl-4 flex flex-col gap-4">
        <ul>
          <li>
            <Link to="/rooms/five">
              <ElementBar>
                <div className="flex justify-between items-center w-full">
                  <UserCard user={user} />
                  <span className="w-2 h-2 rounded-full bg-pictonBlue flex justify-center items-center"></span>
                </div>
              </ElementBar>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Rooms;
