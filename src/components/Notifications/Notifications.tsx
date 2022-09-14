import Bell from "assets/icons/bell.svg";
import Xmark from "assets/icons/xmark.svg";
import Trash from "assets/icons/trash.svg";
import { FunctionComponent, useEffect, useState } from "react";
import Dropdown from "components/Dropdown";
import { Link } from "react-router-dom";
import { Notification } from "types/app";
import { friendsSocket } from "services/socket";
import useAxiosPrivate from "hooks/useAxiosPrivate";

export default function Notifications() {
  const [show, setShow] = useState(false);
  const [news, setNews] = useState(false);
  const [notifications, setNotifications] = useState([] as Notification[]);
  const axiosPrivate = useAxiosPrivate();

  async function clearNotifs() {
    setNotifications([]);
    await axiosPrivate.delete("http://localhost:3500/notification");
  }

  async function showDropDown() {
    setShow(!show);
    if (news) {
      setNews(!news);
      await axiosPrivate.patch("http://localhost:3500/notification");
    }
    // notify();
  }
  useEffect(() => {
    const getNotifications = async () => {
      const res = await axiosPrivate.get("http://localhost:3500/notification");
      let news = false;
      setNotifications(
        res.data.map((n) => {
          const data = JSON.parse(n.json);
          if (!n.seen) news = true;
          return data;
        })
      );
      if (news) setNews(true);
    };

    getNotifications().then(() => {
      friendsSocket.on("notification", async (data) => {
        // add notification to notification states
        setNotifications((notifs) => [data, ...notifs]);
        setNews(true);
      });
    });
  }, []);

  return (
    <div className="notifications">
      <span className={`top-0 ${news ? "red-dot" : ""}`}></span>
      <button className="group bell-button" onClick={showDropDown}>
        <Bell className="iconBell" />
      </button>
      {show && (
        <Dropdown className="sm:w-[300px]" close={() => setShow(false)}>
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
