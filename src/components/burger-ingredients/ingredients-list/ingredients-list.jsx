import React from 'react';
// import PropTypes from 'prop-types';
import ingredientsListStyles from "./ingredients-list.module.css";

import IngredientCard from "./ingredient-card/ingredient-card";

const IngredientsList = ({ingredients, title}) => {
    return (
        <div className={ingredientsListStyles.container}>
            <h3 className="text text_type_main-medium">{title}</h3>

            <ul className={`${ingredientsListStyles.list} pt-6 pr-4 pb-10 pl-4`}>
                {ingredients.map((ingredient) => {
                    return (
                        <IngredientCard key={ingredient._id} ingredient={ingredient} />
                    )
                })}
            </ul>
        </div>
    );
};

// IngredientsList.propTypes = {
//
// };

export default IngredientsList;
