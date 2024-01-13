import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css'
import { ingredientPropTypes } from '../../../../utils/propTypes'

const IngredientDetails = ({ingredient}) => {
    return (
        <div className={`${ingredientDetailsStyles.container} pr-15 pb-5 pl-15`}>
            <img className="mb-4" width="480" height="240" src={ingredient.image_large} alt="ингредиент бургера" />

            <p className="text text_type_main-medium mb-8">{ingredient.name}</p>

            <ul className={ingredientDetailsStyles['nutrition-list']}>
                <li className={ingredientDetailsStyles['nutrition-item']}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient.calories}
                    </p>
                </li>

                <li className={ingredientDetailsStyles['nutrition-item']}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient.proteins}
                    </p>
                </li>

                <li className={ingredientDetailsStyles['nutrition-item']}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient.fat}
                    </p>
                </li>

                <li className={ingredientDetailsStyles['nutrition-item']}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: ingredientPropTypes,
};

export default IngredientDetails;
