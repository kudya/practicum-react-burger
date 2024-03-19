import { ingredientsReducer } from './ingredients';
import { firstIngredientSample, secondIngredientSample } from '../../utils/data/testMocks';

const initialStateEmpty = {
    ingredients: [],
    loading: false,
    error: null,
};

const initialStateWithData = {
    ingredients: [{...firstIngredientSample}, {...secondIngredientSample}],
    loading: false,
    error: null,
};

describe('ingredients reducer', () => {
    it('should return initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialStateEmpty)
    })

    it('should handle pending loadIngredients', () => {
        expect(ingredientsReducer({
            ...initialStateEmpty,
            error: true,
        }, {type: 'ingredients/loadIngredients/pending'}))
            .toEqual({
                ...initialStateEmpty,
                loading: true,
            })
    })

    it('should handle failed loadIngredients', () => {
        expect(ingredientsReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'ingredients/loadIngredients/rejected',
            error: {
                message: 'Ошибка 404'
            }}))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Ошибка 404'
            })
    })

    it('should handle failed loadIngredients with error message placeholder', () => {
        expect(ingredientsReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'ingredients/loadIngredients/rejected',
            error: undefined,
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                error: 'Произошла ошибка при получении ингредиентов',
            })
    })

    it('should handle successful loadIngredients', () => {
        expect(ingredientsReducer({
            ...initialStateEmpty,
            loading: true,
        }, {
            type: 'ingredients/loadIngredients/fulfilled',
            payload: {
                success: true,
                data: [{...firstIngredientSample}, {...secondIngredientSample}],
            }
        }))
            .toEqual({
                ...initialStateEmpty,
                loading: false,
                ingredients: [{...firstIngredientSample}, {...secondIngredientSample}],
            })
    })

    it('should handle clearIngredients', () => {
        expect(ingredientsReducer({
            ...initialStateWithData,
        }, {
            type: 'ingredients/clearIngredients',
        }))
            .toEqual({...initialStateEmpty})
    })
})

