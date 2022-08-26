import Bell from "assets/icons/bell.svg";
import Xmark from "assets/icons/xmark.svg";
import { FunctionComponent, useEffect, useState } from "react";
import Dropdown from "components/Dropdown";
import { Link } from "react-router-dom";
import { Notification } from "types/app";
import Loading from "../Loading";
import { usersSocket } from "services/axios/socket";

export default function Notifications() {
  const [show, setShow] = useState(false);
  const [news, setNews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([] as Notification[]);

  function showDropDown() {
    if (news) {
      setNews(!news);
    }
    setShow(!show);
    // notify();
  }
  useEffect(() => {
    setLoading(true);
    // fetch notifications
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        // if there is some notifications
      }, 2000);
    }

    // on connect
    if (!Loading) {
      usersSocket.emit("notifications");
      usersSocket.on("notification", async (data) => {
        console.log("data notification", data);
        // add notification to notification states
        // setNotifications((notifs) => [...notifs, data]);
        // setNews(true);
      });
    }
  }, [loading]);

  return (
    <div className="notifications">
      <span className={`top-0 ${news ? "red-dot" : ""}`}></span>
      <button className="group bell-button" onClick={showDropDown}>
        <Bell className="iconBell" />
      </button>
      {show && (
        <Dropdown className="sm:w-[300px]">
          <>
            <div className="flex justify-between">
              <p>Notifications </p>
              <button onClick={showDropDown}>
                <Xmark className="w-5 h-5 fill-lotion/50 hover:fill-lotion" />
              </button>
            </div>
            <NotificationList notifications={notifications} />
          </>
        </Dropdown>
      )}
    </div>
  );
}

const NotificationList: FunctionComponent<{
  notifications: Notification[];
}> = ({ notifications }) => {
  if (!notifications.length) {
    return (
      <>
        <p>empty</p>
      </>
    );
  }

  return (
    <ul>
      {notifications.map((n, i) => {
        return (
          <li key={i}>
            <Link
              className="rounded-xl bg-queenBlue flex flex-col p-4"
              to={
                n.type == "request"
                  ? "/friends/requests"
                  : `/profile/${n.sender}`
              }
            >
              <p>
                <strong>{n.sender}</strong> sent you a friend request
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
