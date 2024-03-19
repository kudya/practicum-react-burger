import { feedOrderReducer } from './feedOrder';
import {orderSample} from "../../utils/data/testMocks";

const initialStateEmpty = {
    order: null,
    loading: false,
    error: null,
};

const initialStateWithData = {
    order: {...orderSample},
    loading: false,
    error: null,
};

describe('feedOrder reducer', () => {
    it('should return initial state', () => {
        expect(feedOrderReducer(undefined, {})).toEqual(initialStateEmpty)
    })

    it('should handle pending getOrderByNumber', () => {
        expect(feedOrderReducer({
            ...initialStateEmpty,
            error: 'Ошибка 404',
        }, {type: 'order/getOrderByNumber/pending'}))
            .toEqual({
                ...initialStateEmpty,
                loading: true,
            })
    })

    it('should handle failed getOrderByNumber', () => {
        expect(feedOrderReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'order/getOrderByNumber/rejected',
            error: {
                message: 'Ошибка 404'
            }}))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Ошибка 404'
            })
    })

    it('should handle failed getOrderByNumber with error message placeholder', () => {
        expect(feedOrderReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'order/getOrderByNumber/rejected',
            error: undefined,
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Произошла ошибка при получении информации о заказе',
            })
    })

    it('should handle successful loadIngredients', () => {
        expect(feedOrderReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'order/getOrderByNumber/fulfilled',
            payload: {
                success: true,
                orders: [{...orderSample}],
            }
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                order: {...orderSample},
            })
    })

    it('should handle clearOrder', () => {
        expect(feedOrderReducer({
            ...initialStateWithData,
        }, {
            type: 'feedOrder/clearOrder',
        }))
            .toEqual({...initialStateEmpty})
    })
})
