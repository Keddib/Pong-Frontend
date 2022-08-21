import { axiosAuth } from "services/axios/axios";
import { AnyEventObject, assign } from "xstate";
import { raise } from "xstate/lib/actions";
import { User } from "types/app";

const actions = {
  initContext: assign((context: User, event: AnyEventObject) => {
    return { ...event.data };
  }),

  addFriend: async (context: User, event: AnyEventObject) => {
    console.log("addfriend");
    console.log(context, event);
    try {
      const res = await axiosAuth.post(
        "/friends/add",
        {
          receiver: context.uid,
          sender: event.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(" add friend response", res);
    } catch (error) {
      console.log("error", error, "raise event");
      raise({ type: "FAILED" });
    }
  },
  cancelRequest: async (context: User, event: AnyEventObject) => {
    console.log("unFriend");
    try {
      // action
      const res = await axiosAuth.post(
        "/friends/decline",
        {
          uid: context.rule.request.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      raise({ type: "FAILED" });
    }
  },
  acceptRequest: async (context: User, event: AnyEventObject) => {
    console.log("acceptRequest");
    try {
      // action
      axiosAuth.post(
        "/friends/accept",
        {
          uid: context.rule.request.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      raise({ type: "FAILED" });
    }
  },
  block: async (context: User, event: AnyEventObject) => {
    console.log("block");
    try {
      // action
      axiosAuth.post(
        "/friends/block",
        {
          uid: context.uid,
          blocker: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      raise({ type: "FAILED" });
    }
  },
  unBlock: async (context: User, event: AnyEventObject) => {
    console.log("unBlock");
    try {
      // action
      axiosAuth.post(
        "/friends/unblock",
        {
          uid: context.uid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      raise({ type: "FAILED" });
    }
  },
};

export default actions;
