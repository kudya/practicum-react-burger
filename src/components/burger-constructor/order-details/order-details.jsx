import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import orderDetailsStyles from './order-details.module.css'
import { makeOrder } from '../../../services/actions/order';
import { clearConstructor } from '../../../services/reducers/burgerConstructor';

import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = () => {
    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector(store => store.burgerConstructor);
    const { loading, error, orderNumber } = useSelector(store => store.order);

    useEffect(() => {
        if (bun && ingredients.length) {
            dispatch(makeOrder(collectOrder()))
                .then(res => res.payload.success && dispatch(clearConstructor()));
        }
    }, [])

    const collectOrder = () => {
        const burgerIngredientsIds = ingredients.map(ingredient => ingredient._id);

        burgerIngredientsIds.unshift(bun._id);
        burgerIngredientsIds.push(bun._id);

        return burgerIngredientsIds;
    }

    return (
        <div className={`${orderDetailsStyles.container} pt-4 pb-15`}>
            { loading || error ? (
                <p>
                    {loading ? 'Загрузка...' : 'Произошла ошибка при сборе заказа'}
                </p>
            ) : (
                <>
                    <p className="text text_type_digits-large mb-8">
                        { orderNumber }
                    </p>

                    <p className="text text_type_main-medium mb-15">
                        идентификатор заказа
                    </p>

                    <div className={`${orderDetailsStyles.icon} mb-15`}>
                        <CheckMarkIcon type="primary" />
                    </div>

                    <p className="text text_type_main-default mb-2">
                        Ваш заказ начали готовить
                    </p>

                    <p className="text text_type_main-default text_color_inactive">
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>
            )}
        </div>
    );
};

export default OrderDetails;
