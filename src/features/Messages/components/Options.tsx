import DmIcon from "assets/icons/dm.svg";
import GamePad from "assets/icons/gamepad.svg";
import Ellipsis from "assets/icons/ellipsis.svg";
import Xmark from "assets/icons/xmark.svg";
import Block from "assets/icons/block-user.svg";
import Dropdown from "components/Dropdown";
import { FunctionComponent, useState } from "react";

const Options = () => {
  const [show, setShow] = useState(false);

  function showDropDown() {
    setShow(!show);
  }

  return (
    <div className="relative">
      <button className="group bell-button" onClick={showDropDown}>
        <Ellipsis className="iconBell" />
      </button>
      {show && (
        <Dropdown className="w-[200px]">
          <p>comming soon</p>
        </Dropdown>
      )}
    </div>
  );
};

export default Options;
