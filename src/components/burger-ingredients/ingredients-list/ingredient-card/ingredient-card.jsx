import React from 'react';
// import PropTypes from 'prop-types';
import ingredientCardStyles from './ingredient-card.module.css'

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientCard = ({ingredient}) => {
    return (
        <li className={ingredientCardStyles.ingredient}>
            <img className="mb-1" src={ingredient.image} alt="ингредиент бургера" />

            <div className={`${ingredientCardStyles.price} mb-1`}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p className={`${ingredientCardStyles.name} text text_type_main-default`}>{ingredient.name}</p>
        </li>
    );
};

// IngredientCard.propTypes = {
//
// };

export default IngredientCard;

