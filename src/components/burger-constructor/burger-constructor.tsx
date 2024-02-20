import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css'

import { setBun, addIngredient, changeElementsOrder } from '../../services/reducers/burgerConstructor';

import {CurrencyIcon, Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";
import ConstructorPlaceholder from "./constructor-placeholder/constructor-placeholder";
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';

import {TConstructorIngredientData} from '../../utils/types';

const BurgerConstructor = (): React.JSX.Element => {
    const dispatch = useDispatch();

    // @ts-ignore
    const { user } = useSelector(store => store.auth)
    // @ts-ignore
    const { bun, ingredients } = useSelector(store => store.burgerConstructor)

    const [modalVisible, setModalVisible] = useState(false);

    const navigate = useNavigate();

    const totalPrice = useMemo(()  => {
        if (bun || ingredients.length) {
            return ingredients.reduce((total: number, ingredient: TConstructorIngredientData) => {
                return total + ingredient.price
            }, bun ? bun?.price * 2 : 0);
        }
    }, [bun, ingredients])

    const [ , dropRef ] = useDrop<TConstructorIngredientData, unknown, unknown>(() => ({
        accept: 'ingredient',
        drop: (item ) => {
            if (item.type === 'bun') {
                // @ts-ignore
                dispatch(setBun(item));
            } else {
                // @ts-ignore
                dispatch(addIngredient(item));
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }))

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        // @ts-ignore
        dispatch(changeElementsOrder({dragIndex, hoverIndex}));
    }, [])

    const onButtonClick = () => {
        if (!user) {
            navigate('/login')
        }

        setModalVisible(true);
    }

    const onModalClose = () => setModalVisible(false);

    return (
        <div className="pt-25">
            <div ref={dropRef} className="mb-10 pl-4">
                <div className="pl-8 mb-4">
                    {bun ? (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun?.name} (верх)`}
                            price={bun?.price}
                            thumbnail={bun?.image}
                        />
                    ) : (
                        <ConstructorPlaceholder text={'Выберите булку'} type={'top'}/>
                    )}
                </div>

                {ingredients.length ? (
                    <ul className={`${burgerConstructorStyles.list} custom-scroll mt-2 mb-2`}>
                        {ingredients.map((item: TConstructorIngredientData, index: number) => {
                            return (
                                <li key={item.key}>
                                    <DraggableConstructorElement item={item} moveCard={moveCard} index={index}/>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <div className="pl-8">
                        <ConstructorPlaceholder text={'Выберите начинку'} />
                    </div>
                )}

                <div className="pl-8 mt-4">
                    {bun ? (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun?.name} (низ)`}
                            price={bun?.price}
                            thumbnail={bun?.image}
                        />
                    ) : (
                        <ConstructorPlaceholder text={'Выберите булку'} type={'bottom'}/>
                    )}
                </div>
            </div>

            <div className={burgerConstructorStyles.footer}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">
                        {totalPrice ?? 0}
                    </p>

                    <CurrencyIcon type="primary" />
                </div>

                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={onButtonClick}
                    disabled={!(bun && ingredients.length)}
                >
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

export default BurgerConstructor;
