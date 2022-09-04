import { axiosAuth } from "services/axios/axios";
import { AnyEventObject, assign } from "xstate";
import { raise } from "xstate/lib/actions";
import { User } from "types/app";

const actions = {
  initContext: assign((context: User, event: AnyEventObject) => {
    return { ...event.data };
  }),

  addFriend: async (context: User, event: AnyEventObject) => {
    try {
      await axiosAuth.post(
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
    } catch (error) {
      raise({ type: "FAILED" });
    }
  },
  cancelRequest: async (context: User) => {
    try {
      // action
      await axiosAuth.post(
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
  acceptRequest: async (context: User) => {
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
  block: async (context: User) => {
    try {
      // action
      axiosAuth.post(
        "/friends/block",
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
  unBlock: async (context: User) => {
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
