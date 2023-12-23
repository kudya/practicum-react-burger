import React from 'react';
// import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css'

import ConstructorCard from "./constructor-card/constructor-card";
import constructorCardStyles from "./constructor-card/constructor-card.module.css";
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({order}) => {

    return (
        <div className="pt-25">
            <div className="mb-10">
                <ConstructorCard ingredient={order.bun} fixedPosition={'first'} />

                <div className={`${burgerConstructorStyles.content} custom-scroll mt-2 mb-2`}>
                    {order.content.map((item) => {
                        return (
                            <ConstructorCard ingredient={item}/>
                        )
                    })}
                </div>

                <ConstructorCard ingredient={order.bun} fixedPosition={'last'} />
            </div>

            <div className={burgerConstructorStyles.footer}>
                <div className={`${constructorCardStyles.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">610</p>
                    <CurrencyIcon type="primary" />
                </div>

                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>

            </div>

        </div>
    );
};

// BurgerConstructor.propTypes = {
//
// };

export default BurgerConstructor;
