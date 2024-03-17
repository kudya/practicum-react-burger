import { feedOrdersProfileReducer } from './feedOrdersProfile';
import { orderSample } from '../../utils/data/testMocks';

const initialStateEmpty  = {
    wsConnected: false,
    data: null,
    error: null,
}

describe('feedOrdersProfile reducer', () => {
    it('should return initial state', () => {
        expect(feedOrdersProfileReducer(undefined, {})).toEqual(initialStateEmpty)
    })

    it('should handle wsOpenFeedOrdersProfile', () => {
        expect(feedOrdersProfileReducer({...initialStateEmpty}, {type: 'feedOrdersProfile/wsOpenFeedOrdersProfile'}))
            .toEqual({
                ...initialStateEmpty,
                wsConnected: true,
            })
    })

    it('should handle wsErrorFeedOrdersProfile', () => {
        expect(feedOrdersProfileReducer({
            ...initialStateEmpty,
        }, {
            type: 'feedOrdersProfile/wsErrorFeedOrdersProfile',
            payload: 'Error',
        }))
            .toEqual({
                ...initialStateEmpty,
                error:'Error',
            })
    })

    it('should handle wsCloseFeedOrdersProfile', () => {
        expect(feedOrdersProfileReducer({
            ...initialStateEmpty,
            wsConnected: true,
        }, {type: 'feedOrdersProfile/wsCloseFeedOrdersProfile'}))
            .toEqual({
                ...initialStateEmpty,
                wsConnected: false,
            })
    })

    it('should handle wsMessageFeedOrdersProfile', () => {
        expect(feedOrdersProfileReducer({
            ...initialStateEmpty,
            wsConnected: true,
        }, {
            type: 'feedOrdersProfile/wsMessageFeedOrdersProfile',
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
