import { useState } from 'react';
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import ingredientsListStyles from "./ingredients-list.module.css";
import { ingredientPropTypes } from '../../../utils/propTypes';
import {clearIngredientInfo, loadIngredientInfo} from '../../../services/reducers/ingredientInfo';

import IngredientCard from "./ingredient-card/ingredient-card";
import IngredientDetails from "./ingredient-details/ingredient-details";
import Modal from "../../modal/modal";

const IngredientsList = ({ingredients, title, counter = {}}) => {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const onCardClick = async (ingredient) => {
        await dispatch(loadIngredientInfo(ingredient));
        setModalVisible(true);
    };

    const onModalClose = () => {
        dispatch(clearIngredientInfo());
        setModalVisible(false);
    }

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
                            onCardClick={onCardClick}/>
                    )
                })}
            </ul>

            {modalVisible && (
                <Modal title="Детали ингредиента" onClose={onModalClose} >
                    <IngredientDetails />
                </Modal>

            )}
        </div>
    );
};

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
    title: PropTypes.string,
    counter: PropTypes.object,
};

export default IngredientsList;
