import React from 'react';
import orderDetailsStyles from './order-details.module.css'

import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = () => {
    return (
        <div className={`${orderDetailsStyles.container} pt-4 pb-15`}>
            <p className="text text_type_digits-large mb-8">
                034536
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
        </div>
    );
};

export default OrderDetails;
