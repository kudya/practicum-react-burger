import React from 'react';
import orderCardStyles from './order-card.module.css';
import { Link, useLocation } from 'react-router-dom';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const OrderCard = ():React.JSX.Element => {
    const location = useLocation();

    const from = location.pathname.split('/').includes('feed') ? 'feed' : 'profile';

    const array = [...Array(9)]

    return (
        <div className={`${orderCardStyles.container} p-6 mb-4`}>
            <Link
                className={orderCardStyles.button}
                to={from === 'feed' ? `/feed/${2 + 3}` : `/profile/orders/${2 + 3}`}
                state={{background: location, from}}
            />
            <div className={orderCardStyles.header}>
                <p className='text text_type_digits-default'>
                    #034535
                </p>

                <p className='text text_type_main-default text_color_inactive'>
                    Сегодня, 16:20
                </p>
            </div>

            <p className='text text_type_main-medium'>
                Death Star Starship Main бургер
            </p>

            <div className={orderCardStyles.footer}>
                <div className={orderCardStyles.preview}>
                    {array.slice(0, 6).map((item, index) => (
                        <div
                            className={orderCardStyles['preview-item']}
                            style={{zIndex: 6 - index}}
                        >
                            <img height={60} src='https://code.s3.yandex.net/react/code/meat-03-mobile.png' alt={''} />
                            {index === 5 && array.length > 6 && (
                                <div
                                    className={orderCardStyles.overflow}
                                >
                                    <p className="text text_type_main-default">{`+${array.length - 6}`}</p>
                                </div>
                            )}
                        </div>

                    ))}
                </div>

                <div className={`${orderCardStyles.price} mb-1`}>
                    <p className="text text_type_digits-default mr-2">480</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    );
};

export default OrderCard;
