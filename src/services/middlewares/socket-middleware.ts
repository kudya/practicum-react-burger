import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TWsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    wsConnecting?: ActionCreatorWithoutPayload,
    onOpen?: ActionCreatorWithoutPayload,
    onClose?: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
};

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware<{}, RootState> => {
    return(store) => {
        let socket: WebSocket | null = null;

        const {
            wsConnect,
            wsDisconnect,
            wsSendMessage,
            wsConnecting,
            onOpen,
            onClose,
            onError,
            onMessage,
        } = wsActions;

        const {dispatch} = store;

        return (next) => (action) => {
            if (wsConnect.match(action)) {
                socket = new WebSocket(action.payload)
                wsConnecting && dispatch(wsConnecting())

                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                }

                socket.onerror = () => {
                    dispatch(onError("Error"));
                }

                socket.onclose = () => {
                    onClose && dispatch(onClose());
                }

                socket.onmessage = (event) => {
                    const {data} = event;
                    try {
                        const parsedData = JSON.parse(data);

                        dispatch(onMessage(parsedData));
                    } catch (error) {
                        dispatch(onError((error as SyntaxError).message))
                    }
                }
            }

            if (socket && wsSendMessage && wsSendMessage.match(action)) {
                try {
                    const message = JSON.stringify((action.payload));

                    socket.send(message);
                } catch (error) {
                    dispatch(onError((error as TypeError).message));
                }
            }

            if (socket && wsDisconnect.match(action)) {
                socket.close();
                socket = null;
            }

            next(action);
        }
    }
}


