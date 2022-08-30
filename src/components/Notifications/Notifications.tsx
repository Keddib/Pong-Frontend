import Bell from "assets/icons/bell.svg";
import Xmark from "assets/icons/xmark.svg";
import Trash from "assets/icons/trash.svg";
import { FunctionComponent, useEffect, useState } from "react";
import Dropdown from "components/Dropdown";
import { Link } from "react-router-dom";
import { Notification } from "types/app";
import Loading from "../Loading";
import { friendsSocket } from "services/axios/socket";

export default function Notifications() {
  const [show, setShow] = useState(false);
  const [news, setNews] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([] as Notification[]);

  function clearNotifs() {
    setNotifications([]);
  }

  function showDropDown() {
    if (news) {
      setNews(!news);
    }
    setShow(!show);
    // notify();
  }
  useEffect(() => {
    // setLoading(true);
    // fetch notifications
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        // if there is some notifications
      }, 2000);
    }

    // on connect

    friendsSocket.emit("notifications");
    friendsSocket.on("notification", async (data) => {
      console.log("data notification", data);
      // add notification to notification states
      setNotifications((notifs) => [data, ...notifs]);
      setNews(true);
    });
    console.log("listening for notifications");
  }, []);

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
            <NotificationList
              notifications={notifications}
              clearNotifs={clearNotifs}
            />
          </>
        </Dropdown>
      )}
    </div>
  );
}

const NotificationList: FunctionComponent<{
  notifications: Notification[];
  clearNotifs: () => void;
}> = ({ notifications, clearNotifs }) => {
  if (!notifications.length) {
    return (
      <>
        <p>empty</p>
      </>
    );
  }

  return (
    <div>
      <ul className=" flex flex-col gap-1">
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
                  <strong>{n.sender}</strong>{" "}
                  {n.type == "request"
                    ? "sent you a friend request"
                    : "accept your friend request"}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        className="text-sm flex gap-2 font-light mt-2 hover:scale-105 bg-lotion/70 rounded-3xl text-red/50 px-2 hover:bg-lotion"
        onClick={clearNotifs}
      >
        clear all
        <Trash className="w-3 fill-red/50" />
      </button>
    </div>
  );
};
