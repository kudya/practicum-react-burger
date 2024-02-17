import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd'
import ingredientCardStyles from './ingredient-card.module.css'
import { ingredientPropTypes } from '../../../../utils/propTypes'

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientCard = ({ingredient, count, onCardClick}) => {
    const location = useLocation();

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'ingredient',
        item: {...ingredient},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const opacity = isDragging ? 0.4 : 1;

    return (
        <li ref={dragRef} style={{ opacity }} className={ingredientCardStyles.ingredient}>
            <Link
                className={ingredientCardStyles.button}
                to={`/ingredients/${ingredient._id}`}
                state={{background: location}}
            />

            {count && (
                <Counter count={count} size="default" />
            )}

            <img className="mb-1" src={ingredient.image} alt={`${ingredient.name ?? 'Ингредиент бургера'}.`} />

            <div className={`${ingredientCardStyles.price} mb-1`}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p className={`${ingredientCardStyles.name} text text_type_main-default`}>{ingredient.name}</p>
        </li>
    );
};

IngredientCard.propTypes = {
    ingredient: ingredientPropTypes,
    onCardClick: PropTypes.func,
    count: PropTypes.number,
};

export default IngredientCard;

