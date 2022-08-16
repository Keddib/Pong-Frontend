import { createMachine, assign, AnyEventObject } from "xstate";
import { Game, User } from "types/app";

interface profileContext {
  user: User;
  games: Game[];
}

const initContext = assign<profileContext, AnyEventObject>((context, event) => {
  console.log("event", event);
  return { user: event.data.user, games: event.data.games };
});

export const profileMachine = createMachine(
  {
    predictableActionArguments: true,
    schema: {
      context: {} as { user: User; games: Game[] },
    },
    id: "profile",
    initial: "loading",
    states: {
      loading: {
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
      player: {
        entry: ["initContext"],
        initial: "none",
        always: [
          { cond: (ctx) => ctx.user.rule == "me", target: ".me" },
          { cond: (ctx) => ctx.user.rule == "friend", target: ".friend" },
          { cond: (ctx) => ctx.user.rule == "sender", target: ".sender" },
          { cond: (ctx) => ctx.user.rule == "receiver", target: ".receiver" },
          { cond: (ctx) => ctx.user.rule == "blocked", target: ".blocked" },
          { cond: (ctx) => ctx.user.rule == "blocked", target: ".none" },
        ],
        states: {
          me: {},
          friend: {
            on: {
              UNFRIEND: {
                actions: [],
                target: "none",
              },
            },
          },
          sender: {
            on: {
              ACCEPT: {
                actions: [],
                target: "friend",
              },
              REJECT: {
                target: "none",
              },
            },
          },
          receiver: {
            on: {
              CANCEL: {
                target: "none",
              },
            },
          },
          none: {
            on: {
              ADDFRIEND: "receiver",
            },
          },
          blocked: {
            on: {
              UNBLOCK: "none",
            },
          },
        },
        on: {
          BLOCK: ".blocked",
        },
      },
      error: {
        type: "final",
      },
    },
  },
  {
    actions: {
      initContext: initContext,
      addFriend: () => {},
      unFriend: () => {},
      cancelRequest: () => {},
      sendRequest: () => {},
      acceptRequest: () => {},
      rejectRequest: () => {},
      block: () => {},
    },
  }
);
