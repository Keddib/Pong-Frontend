import { useState } from "react";
import Bell from "/src/assets/icons/bell.svg";
import Dropdown from "/src/Components/Dropdown";

export default function Notifications() {

  let [show, setShow] = useState(false);
  let [news, setNews] = useState(true);

  function showDropDown() {
    if (news) {
      setNews(!news);
    }
    setShow(!show);
  }

  return (
    <div className="relative">
      <span className={`top-0 ${news ? 'red-dot' : ''}`}></span>
      <button
        className="group bell-button"
        onClick={showDropDown}
        onBlur={() => { if (show) setShow(!show); }}
      >
        <Bell className="iconBell" />
      </button>
      {
        show &&
        <Dropdown>
          <div>
            <p><strong>keddib</strong> sent you friend request</p>
          </div>
          <div>
            <p><strong>keddib</strong> sent you friend request</p>
          </div>
          <div>
            <p><strong>keddib</strong> sent you friend request</p>
          </div>
        </Dropdown>
      }
    </div >
  );
}
