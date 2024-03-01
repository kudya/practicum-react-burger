import React from 'react';
import ingredientsListStyles from "./ingredients-list.module.css";

import IngredientCard from "./ingredient-card/ingredient-card";

import {TIngredientData} from '../../../utils/types';

type TIngredientsListProps = {
    ingredients: Array<TIngredientData>,
    title: string,
    counter: {[key: string]: number},
}

const IngredientsList = ({ingredients, title, counter = {}}: TIngredientsListProps): React.JSX.Element => {
    return (
        <div>
            <h3 className="text text_type_main-medium">{title}</h3>

            <ul className={`${ingredientsListStyles.list} pt-6 pr-4 pb-10 pl-4`}>
                {ingredients.map((ingredient) => {
                    return (
                        <IngredientCard
                            key={ingredient._id}
                            ingredient={ingredient}
                            count={counter[ingredient._id]}
                        />
                    )
                })}
            </ul>
        </div>
    );
};

export default IngredientsList;
