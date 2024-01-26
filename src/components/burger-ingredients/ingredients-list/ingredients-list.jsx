import PropTypes from 'prop-types';
import ingredientsListStyles from "./ingredients-list.module.css";
import { ingredientPropTypes } from '../../../utils/propTypes';

import IngredientCard from "./ingredient-card/ingredient-card";

const IngredientsList = ({ingredients, title, counter = {}}) => {
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

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
    title: PropTypes.string,
    counter: PropTypes.object,
};

export default IngredientsList;
