import { AnyEventObject, assign, createMachine } from "xstate";
import { axiosAuth } from "services/axios/axios";

interface TFAcontext {
  QRcodeUrl: string;
  secret: string;
  error: string;
}

const TFAmachine = createMachine(
  {
    predictableActionArguments: true,
    schema: {
      context: {} as TFAcontext,
    },

    id: "2FA",

    context: {
      QRcodeUrl: "",
      secret: "",
      error: "",
    },

    initial: "entry",

    states: {
      entry: {
        on: {
          CONTINUE: "scanning",
        },
      },
      scanning: {
        invoke: {
          id: "init2FA",
          src: "load2FA",
          onDone: {
            actions: ["assignContext"],
          },
          onError: "error",
        },
        on: {
          NEXT: "confirm",
        },
      },
      confirm: {
        initial: "waitingCode",
        states: {
          waitingCode: {
            on: {
              INVALIDCODE: {
                target: "invalidCode",
                actions: "setError",
              },
            },
          },
          invalidCode: {},
        },
        on: {
          FAILED: "error",
          SUCCESS: "success",
        },
      },
      error: {
        on: {
          RETRY: "entry",
        },
      },
      success: {
        type: "final",
      },
    },
  },
  {
    actions: {
      assignContext: assign((context, event: AnyEventObject) => ({
        secret: event.data.secret,
        QRcodeUrl: event.data.url,
      })),
      setError: assign((context, event) => ({
        error: "error",
      })),
    },
    services: {
      load2FA: async function get2FAconfig() {
        const res = await axiosAuth.get<{ url: string; secret: string }>(
          "auth/generate"
        );
        return res.data;
      },
    },
  }
);

export default TFAmachine;
