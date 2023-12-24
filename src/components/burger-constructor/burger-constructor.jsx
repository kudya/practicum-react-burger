import React, {useState} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css'
import { ingredientPropTypes } from '../../utils/propTypes'

import {CurrencyIcon, Button, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";

const BurgerConstructor = ({order}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const onButtonClick = () => setModalVisible(true);

    const onModalClose = () => setModalVisible(false);

    return (
        <div className="pt-25">
            <div className="mb-10 pl-4">
                <div className="pl-8 mb-4">
                    <ConstructorElement
                        className=""
                        type="top"
                        isLocked={true}
                        text={order.bun.name}
                        price={order.bun.price}
                        thumbnail={order.bun.image}
                    />
                </div>

                <ul className={`${burgerConstructorStyles.list} custom-scroll mt-2 mb-2`}>
                    {order.content.map((item) => {
                        return (
                            <li key={item._id} className={burgerConstructorStyles.item}>
                                <div className="mr-2">
                                    <DragIcon type="primary" />
                                </div>

                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                        )
                    })}
                </ul>

                <div className="pl-8 mt-4">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={order.bun.name}
                        price={order.bun.price}
                        thumbnail={order.bun.image}
                    />
                </div>
            </div>

            <div className={burgerConstructorStyles.footer}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">610</p>
                    <CurrencyIcon type="primary" />
                </div>

                <Button htmlType="button" type="primary" size="large" onClick={onButtonClick}>
                    Оформить заказ
                </Button>

            </div>

            {modalVisible && (
                <Modal onClose={onModalClose} >
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
};

BurgerConstructor.propTypes = {
    order: PropTypes.shape({
        bun: ingredientPropTypes,
        content: PropTypes.arrayOf(ingredientPropTypes),
    })
};

export default BurgerConstructor;
