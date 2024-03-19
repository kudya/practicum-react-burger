import { feedOrdersReducer } from './feedOrdersTotal';
import { orderSample } from '../../utils/data/testMocks';

const initialStateEmpty  = {
    wsConnected: false,
    data: null,
    error: null,
}

describe('feedOrders reducer', () => {
    it('should return initial state', () => {
        expect(feedOrdersReducer(undefined, {})).toEqual(initialStateEmpty)
    })

    it('should handle wsOpenFeedOrders', () => {
        expect(feedOrdersReducer({...initialStateEmpty}, {type: 'feedOrdersTotal/wsOpenFeedOrders'}))
            .toEqual({
                ...initialStateEmpty,
                wsConnected: true,
            })
    })

    it('should handle wsErrorFeedOrders', () => {
        expect(feedOrdersReducer({
            ...initialStateEmpty,
        }, {
            type: 'feedOrdersTotal/wsErrorFeedOrders',
            payload: 'Error',
        }))
            .toEqual({
                ...initialStateEmpty,
                error:'Error',
            })
    })

    it('should handle wsCloseFeedOrders', () => {
        expect(feedOrdersReducer({
            ...initialStateEmpty,
            wsConnected: true,
        }, {type: 'feedOrdersTotal/wsCloseFeedOrders'}))
            .toEqual({
                ...initialStateEmpty,
                wsConnected: false,
            })
    })

    it('should handle wsMessageFeedOrders', () => {
        expect(feedOrdersReducer({
            ...initialStateEmpty,
            wsConnected: true,
        }, {
            type: 'feedOrdersTotal/wsMessageFeedOrders',
            payload: {
                success: true,
                orders: [{...orderSample}],
                total: 30000,
                totalToday: 3000,
            }
        }))
            .toEqual({
                ...initialStateEmpty,
                wsConnected: true,
                data: {
                    success: true,
                    orders: [{...orderSample}],
                    total: 30000,
                    totalToday: 3000,
                }
            })
    })

})
