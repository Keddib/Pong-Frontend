import { AnyEventObject, assign, createMachine } from "xstate";
import { User } from "types/app";
import { axiosAuth } from "services/axios/axios";
import { raise } from "xstate/lib/actions";

const profileMachine = createMachine(
  {
    predictableActionArguments: true,
    schema: {
      context: {} as User,
    },
    id: "profile",
    initial: "loading",
    states: {
      loading: {},
      player: {
        initial: "define",
        entry: ["initContext"],
        states: {
          define: {
            always: [
              { cond: (ctx) => ctx.rule == "me", target: "me" },
              { cond: (ctx) => ctx.rule == "friend", target: "friend" },
              { cond: (ctx) => ctx.rule == "sender", target: "sender" },
              { cond: (ctx) => ctx.rule == "receiver", target: "receiver" },
              { cond: (ctx) => ctx.rule == "blocked", target: "blocked" },
              { cond: (ctx) => ctx.rule == "blocked", target: "none" },
            ],
          },
          me: {},
          friend: {
            on: {
              UNFRIEND: {
                actions: ["unFriend"],
                target: "none",
              },
            },
          },
          sender: {
            on: {
              ACCEPT: {
                actions: ["acceptRequest"],
                target: "friend",
              },
              REJECT: {
                actions: ["rejectRequest"],
                target: "none",
              },
            },
          },
          receiver: {
            on: {
              CANCEL: {
                target: "none",
                actions: ["cancelRequest"],
              },
            },
          },
          none: {
            on: {
              ADDFRIEND: {
                actions: ["addFriend"],
              },
              ADDED: {
                target: "receiver",
              },
            },
          },
          blocked: {
            on: {
              UNBLOCK: {
                target: "none",
                actions: ["unBlock"],
              },
            },
          },
        },
        on: {
          BLOCK: {
            target: ".blocked",
            actions: ["block"],
          },
          FAILED: ".define",
        },
      },
      error: {
        type: "final",
      },
    },
    on: {
      DATA_CHANGED: [
        {
          target: "player",
          cond: (context, event) => event.data,
        },
        {
          target: "error",
          cond: (context, event) => event.error,
        },
      ],
    },
  },
  {
    actions: {
      initContext: assign((context, event: AnyEventObject) => ({
        ...event.data,
      })),

      addFriend: async (context, event) => {
        console.log("addfriend");
        console.log(context, event);
        await axiosAuth.post("/friends/add", {
          receiver: context.uid,
          sender: event.uid,
        });
        raise({ type: "ADDED" });
      },
      unFriend: () => {
        console.log("unFriend");
      },
      cancelRequest: () => {
        console.log("cancelRequest");
      },
      sendRequest: () => {
        console.log("sendRequest");
      },
      acceptRequest: () => {
        console.log("acceptRequest");
      },
      rejectRequest: () => {
        console.log("rejectRequest");
      },
      block: () => {
        console.log("block");
      },
      unBlock: () => {
        console.log("unBlock");
      },
    },
  }
);

export default profileMachine;
