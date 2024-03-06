import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from '../store';
import {refreshToken} from '../../utils/api/auth-api';

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

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (wsActions: TWsActionTypes, withRefreshToken = false): Middleware<{}, RootState> => {
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

        let url = '';
        let isConnected = false;
        let reconnectTimer = 0;

        return (next) => (action) => {
            if (wsConnect.match(action)) {
                socket = new WebSocket(action.payload);
                url = action.payload;
                isConnected= true;

                wsConnecting && dispatch(wsConnecting());

                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                }

                socket.onerror = () => {
                    dispatch(onError("Error"));
                }

                socket.onclose = () => {
                    onClose && dispatch(onClose());

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(url));
                        }, RECONNECT_PERIOD)
                    }
                }

                socket.onmessage = (event) => {
                    const {data} = event;
                    try {
                        const parsedData = JSON.parse(data);

                        if (withRefreshToken && parsedData.message === 'Invalid or missing token') {
                            refreshToken()
                                .then(refreshData => {
                                    const wssUrl = new URL(url);
                                    wssUrl.searchParams.set(
                                        'token',
                                        refreshData.accessToken.replace('Bearer ', '')
                                    );
                                    dispatch(wsConnect(wssUrl.toString()));
                                })
                                .catch(error => {
                                    dispatch(onError(error.message))
                                });

                            dispatch(wsDisconnect());

                            return;
                        }

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
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;
            }

            next(action);
        }
    }
}


