import { orderReducer } from './order';
import { orderSample } from '../../utils/data/testMocks';

const initialStateEmpty = {
    orderNumber: null,
    loading: false,
    error: null,
};

describe('order reducer', () => {
    it('should return initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialStateEmpty)
    })

    it('should handle pending makeOrder', () => {
        expect(orderReducer({
            ...initialStateEmpty,
            error: true,
        }, {type: 'order/makeOrder/pending'}))
            .toEqual({
                ...initialStateEmpty,
                loading: true,
            })
    })

    it('should handle failed makeOrder', () => {
        expect(orderReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'order/makeOrder/rejected',
            error: {
                message: 'Ошибка 404'
            }}))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Ошибка 404'
            })
    })

    it('should handle failed makeOrder with error message placeholder', () => {
        expect(orderReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'order/makeOrder/rejected',
            error: undefined,
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Произошла ошибка при сборе заказа',
            })
    })

    it('should handle successful loadIngredients', () => {
        expect(orderReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'order/makeOrder/fulfilled',
            payload: {
                success: true,
                name: 'Флюоресцентный spicy бургер',
                order: {
                    ...orderSample,
                    number: 36187,
                },
            }
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                orderNumber: 36187,
            })
    })
})
