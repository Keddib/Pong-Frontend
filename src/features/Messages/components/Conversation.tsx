import { Link } from "react-router-dom";
import ElementBar from "components/ElementBar";
import RoomCard from "~/src/components/RoomCard";

const room = {
  name: "KhromBrom",
  id: "skhds_sdskhd_123",
};

const Conversation = () => {
  return (
    <Link to="12893">
      <ElementBar rank={-1}>
        <div className="flex justify-between items-center w-full">
          <RoomCard room={room} />
          <span className="bg-pictonBlue w-4 h-4 sm:w-6 sm:h-6 rounded-full flex justify-center items-center">
            1
          </span>
        </div>
      </ElementBar>
    </Link>
  );
};

export default Conversation;
