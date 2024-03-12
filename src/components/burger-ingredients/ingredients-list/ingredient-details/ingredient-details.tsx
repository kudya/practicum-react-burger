import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ingredientDetailsStyles from './ingredient-details.module.css';
import {loadIngredientInfo} from '../../../../services/reducers/ingredientInfo';
import { useDispatch, useSelector } from '../../../../services/store';

import {TIngredientData} from '../../../../utils/types';


const IngredientDetails = (): React.JSX.Element => {
    const { ingredients } = useSelector(store => store.ingredients)
    const { ingredient } = useSelector(store => store.ingredientInfo);

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        if (ingredients.length) {
            const currentIngredient = ingredients.find((ingredient: TIngredientData) => ingredient._id === id);
            dispatch(loadIngredientInfo(currentIngredient))
        }
    }, [ingredients.length])

    return (
        <div className={`${ingredientDetailsStyles.container} pr-15 pb-5 pl-15`}>
            <img className="mb-4" width="480" height="240" src={ingredient?.image_large} alt={`${ingredient?.name ?? 'Ингредиент бургера'}.`} />

            <p className="text text_type_main-medium mb-8">{ingredient?.name}</p>

            <ul className={ingredientDetailsStyles['nutrition-list']}>
                <li className={ingredientDetailsStyles['nutrition-item']}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient?.calories}
                    </p>
                </li>

                <li className={ingredientDetailsStyles['nutrition-item']}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient?.proteins}
                    </p>
                </li>

                <li className={ingredientDetailsStyles['nutrition-item']}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient?.fat}
                    </p>
                </li>

                <li className={ingredientDetailsStyles['nutrition-item']}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>

                    <p className="text text_type_digits-default text_color_inactive">
                        {ingredient?.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default IngredientDetails;
