import {burgerConstructorReducer } from './burgerConstructor';
import {
    firstIngredientSample,
    secondIngredientSample,
    thirdIngredientSample,
} from "../../utils/data/testMocks";

const initialStateEmpty = {
    bun: null,
    ingredients: [],
};

const initialStateWithData = {
    bun: {...firstIngredientSample, key: '123abc'},
    ingredients: [
        {...secondIngredientSample, key: '456def'},
        {...thirdIngredientSample, key: '789jkl'}],
};

describe('burgerConstructor reducer', () => {
    it('should return initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialStateEmpty)
    })

    it('should handle setBun', () => {
        expect(burgerConstructorReducer({
            ...initialStateEmpty,
        }, {
            type: 'burgerConstructor/setBun',
            payload: {...firstIngredientSample, key: '123abc'}
            }))
            .toEqual({
                ...initialStateEmpty,
                bun: {...firstIngredientSample, key: '123abc'},
            })
    })

    it('should handle addIngredient', () => {
        expect(burgerConstructorReducer({
            ...initialStateEmpty,
        }, {
            type: 'burgerConstructor/addIngredient',
            payload: {...secondIngredientSample, key: '456def'}
        }))
            .toEqual({
                ...initialStateEmpty,
                ingredients: [{...secondIngredientSample, key: '456def'}],
            })
    })

    it('should handle removeIngredient', () => {
        expect(burgerConstructorReducer({
            ...initialStateWithData,
        }, {
            type: 'burgerConstructor/removeIngredient',
            payload: '456def',
        }))
            .toEqual({
                ...initialStateWithData,
                ingredients: [{...thirdIngredientSample, key: '789jkl'}],
            })
    })

    it('should handle changeElementsOrder', () => {
        expect(burgerConstructorReducer({
            ...initialStateWithData,
        }, {
            type: 'burgerConstructor/changeElementsOrder',
            payload: {dragIndex: 0, hoverIndex: 1},
        }))
            .toEqual({
                ...initialStateWithData,
                ingredients: [
                    {...thirdIngredientSample, key: '789jkl'},
                    {...secondIngredientSample, key: '456def'},
                ],
            })
    })

    it('should handle clearConstructor', () => {
        expect(burgerConstructorReducer({
            ...initialStateWithData,
        }, {type: 'burgerConstructor/clearConstructor'}))
            .toEqual({
                ...initialStateEmpty,
            })
    })
})
