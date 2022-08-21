import { createMachine } from "xstate";
import { User } from "types/app";
import profileActions from "./actions";

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
              { cond: (ctx) => ctx.rule.rule == "me", target: "me" },
              { cond: (ctx) => ctx.rule.rule == "friends", target: "friend" },
              { cond: (ctx) => ctx.rule.rule == "sender", target: "sender" },
              {
                cond: (ctx) => ctx.rule.rule == "receiver",
                target: "receiver",
              },
              { cond: (ctx) => ctx.rule.rule == "blocked", target: "blocked" },
              {
                cond: (ctx) => ctx.rule.rule == "none",
                target: "none",
              },
            ],
          },
          me: {},
          friend: {
            on: {
              CANCELREQUEST: {
                actions: ["cancelRequest"],
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
              CANCELREQUEST: {
                actions: ["cancelRequest"],
                target: "none",
              },
            },
          },
          receiver: {
            on: {
              CANCELREQUEST: {
                actions: ["cancelRequest"],
                target: "none",
              },
            },
          },
          none: {
            on: {
              ADDFRIEND: {
                actions: ["addFriend"],
                target: "receiver",
              },
            },
          },
          blocked: {
            on: {
              UNBLOCK: {
                actions: ["unBlock"],
                target: "none",
              },
            },
          },
        },
        on: {
          BLOCK: {
            actions: ["block"],
            target: ".blocked",
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
          cond: (context, event) => {
            console.log("event ", event);
            return event.data;
          },
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
      initContext: profileActions.initContext,
      addFriend: profileActions.addFriend,
      cancelRequest: profileActions.cancelRequest,
      acceptRequest: profileActions.acceptRequest,
      block: profileActions.block,
      unBlock: profileActions.unBlock,
    },
  }
);

export default profileMachine;
