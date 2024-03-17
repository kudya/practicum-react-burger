import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');
export const disconnect = createAction('WS_DISCONNECT');
