import Failed from "assets/icons/failed.svg";

const GameInviteCancel = () => (
  <div className="w-full flex gap-2 items-center py-3">
    <Failed className="w-5 fill-crayola" />
    <p className="text-lotion">your invitation has been cancled</p>
  </div>
);

export default GameInviteCancel;
