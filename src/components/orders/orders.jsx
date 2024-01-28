import React from 'react';
import PropTypes from 'prop-types';
import ordersStyles from './orders.module.css'

const Orders = ()=> {
    return (
        <div className={`${ordersStyles.container} pt-30`}>
            <p className='text text_type_digits-medium mb-6'>
                🛠
            </p>

            <p className={`${ordersStyles.text} text text_type_main-medium text_color_inactive mb-6`}>
                Скоро здесь будет страница или, возможно, целая космическая станция
            </p>

            <p className="text text_type_digits-medium">
                🚀
            </p>
        </div>
    );
};

Orders.propTypes = {

};

export default Orders;
