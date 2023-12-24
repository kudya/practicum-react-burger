import { useState } from 'react';
import PropTypes from 'prop-types';
import ingredientsListStyles from "./ingredients-list.module.css";
import { ingredientPropTypes } from '../../../utils/propTypes'

import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientDetails from "./ingredient-details/ingredient-details";
import Modal from "../../modal/modal";

const IngredientsList = ({ingredients, title}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const onCardClick = (ingredient) => {
        setActiveItem(ingredient);
        setModalVisible(true);
    };


    const onModalClose = () => {
        setActiveItem(null);
        setModalVisible(false);
    }

    return (
        <div>
            <h3 className="text text_type_main-medium">{title}</h3>

            <ul className={`${ingredientsListStyles.list} pt-6 pr-4 pb-10 pl-4`}>
                {ingredients.map((ingredient) => {
                    return (
                        <IngredientCard key={ingredient._id} ingredient={ingredient} onCardClick={onCardClick}/>
                    )
                })}
            </ul>

            {modalVisible && (
                <Modal title="Детали ингредиента" onClose={onModalClose} >
                    <IngredientDetails ingredient={activeItem} />
                </Modal>

            )}
        </div>
    );
};

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
    title: PropTypes.string,
};

export default IngredientsList;
