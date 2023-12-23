import React from 'react';
// import PropTypes from 'prop-types';
import constructorCardStyles from './constructor-card.module.css'

import { CurrencyIcon,  LockIcon, DeleteIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const ConstructorCard = ({ingredient, fixedPosition}) => {
    const fixedCardStyle = fixedPosition === 'first' ?
        {borderRadius: '88px 88px 40px 40px'} :
        {borderRadius: '40px 40px 88px 88px'}

    return (
        <div className={`${constructorCardStyles.card} pr-4 pl-4`}>
            <div style={{flexShrink: 0}}>
                <DragIcon type="primary" />
            </div>


            <div className={`${constructorCardStyles.content} ml-2 pt-4 pr-8 pb-4 pl-6`} style={fixedPosition ? fixedCardStyle : null}>
                <img className="mr-5" width="80px" src={ingredient.image} alt="ингредиент бургера" />

                <p className={`${constructorCardStyles.name} text text_type_main-default mr-5`}>
                    {ingredient.name}
                </p>

                <div className={`${constructorCardStyles.price} mr-5`}>
                    <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>


                <div style={{flexShrink: 0}}>
                    {fixedPosition ? <LockIcon type="secondary" /> : <DeleteIcon type="primary"/>}
                </div>

            </div>
        </div>
    );
};

// ConstructorCard.propTypes = {
//
// };

export default ConstructorCard;
