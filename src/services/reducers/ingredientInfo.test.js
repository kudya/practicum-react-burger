import { ingredientInfoReducer } from './ingredientInfo';
import { firstIngredientSample } from "../../utils/data/testMocks";

const initialStateEmpty = {
    ingredient: null,
};

const initialStateWithData = {
    ingredient: {...firstIngredientSample},
};

describe('ingredientInfo reducer', () => {
    it('should return initial state', () => {
        expect(ingredientInfoReducer(undefined, {})).toEqual(initialStateEmpty)
    })

    it('should handle loadIngredientInfo', () => {
        expect(ingredientInfoReducer({
            ...initialStateEmpty,
        }, {
            type: 'ingredientInfo/loadIngredientInfo',
            payload: {...firstIngredientSample},
        }))
            .toEqual({
                ingredient: {...firstIngredientSample},
            })
    })

    it('should handle clearIngredientInfo', () => {
        expect(ingredientInfoReducer({
            ...initialStateWithData,
        }, {
            type: 'ingredientInfo/clearIngredientInfo',
        }))
            .toEqual({...initialStateEmpty})
    })
})
