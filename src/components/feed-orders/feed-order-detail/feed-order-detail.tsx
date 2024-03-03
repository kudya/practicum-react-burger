import React from 'react';
import feedOrderDetailStyles from './feed-order-detail.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TFeedOrderDetailProps = {
    withOrderNumber?: Boolean,
}

const FeedOrderDetail = ({ withOrderNumber = true }: TFeedOrderDetailProps): React.JSX.Element => {
    return (
        <div className={feedOrderDetailStyles.container}>
            {withOrderNumber && (
                <p className={`${feedOrderDetailStyles.header} text text_type_digits-default`}>
                    #034533
                </p>
            )}

            <p className='text text_type_main-medium mt-5 mb-3'>
                Black Hole Singularity острый бургер
            </p>

            <p className={`${feedOrderDetailStyles.status} text text_type_main-default mb-15`}>
                Выполнен
            </p>

            <div className={`${feedOrderDetailStyles.content} mb-10`}>
                <p className='text text_type_main-medium mb-6'>Состав:</p>

                <ul className={`${feedOrderDetailStyles['content-list']} custom-scroll`}>
                    {[...Array(5)].map(() => (
                        <li className={feedOrderDetailStyles['content-list-item']}>
                            <div className={`${feedOrderDetailStyles['item-img']} mr-4`}>
                                <img height={60} src='https://code.s3.yandex.net/react/code/meat-03-mobile.png' alt={''} />
                            </div>

                            <p className='text text_type_main-default mr-4'>
                                Филе Люминесцентного тетраодонтимформа
                            </p>

                            <div className={`${feedOrderDetailStyles.price} mb-1`}>
                                <p className="text text_type_digits-default mr-2">2 х 480</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={feedOrderDetailStyles.footer} >
                <p className='text text_type_main-default text_color_inactive'>
                    Вчера, 13:50
                </p>

                <div className={`${feedOrderDetailStyles.price} mb-1`}>
                    <p className="text text_type_digits-default mr-2">510</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default FeedOrderDetail;
