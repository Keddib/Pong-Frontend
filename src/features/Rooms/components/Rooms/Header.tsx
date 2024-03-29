import Connect from "assets/images/rooms.png";
import useMedia from "hooks/useMedia";
import { mediaQueries } from "config/index";
import SearchBar from "components/SearchBar";
import RoomForm from "./RoomForm";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

const Header: FunctionComponent<{
  setQuery: Dispatch<SetStateAction<string>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}> = ({ setQuery, setRefresh }) => {
  const md = useMedia(mediaQueries.md);
  return (
    <header className="bg-queenBlue/50 rounded-2xl p-4 relative md:h-[200px] flex">
      {md && <img alt="prize" src={Connect} className="h-[150px] " />}
      <div className="flex flex-col gap-4  grow">
        <div className="md:ml-10 w-fit h-full flex flex-col gap-4 justify-between">
          <h4 className="capitalize text-2xl">search for a room</h4>
          <SearchBar setQuery={setQuery} />
        </div>
        <div className="w-1/2 md:w-1/4 self-end">
          <RoomForm setRefresh={setRefresh} />
        </div>
      </div>
    </header>
  );
};

export default Header;
