import React, { useMemo } from 'react';
import orderCardStyles from './order-card.module.css';
import { Link, useLocation } from 'react-router-dom';
import {useSelector} from '../../../services/store';
import {TFeedOrder, TIngredientData} from '../../../utils/types';

import { CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components'


type TOrderCardProps = {
    order?: TFeedOrder;
}

const OrderCard = ({order}: TOrderCardProps):React.JSX.Element => {
    const { ingredients } = useSelector(store => store.ingredients);

    const location = useLocation();

    const { name, number, ingredients: ingredientIds, createdAt } = order ?? {};

    const preparedIngredients = ingredientIds?.map(id => {
        return ingredients.find((ingredient: TIngredientData)=> ingredient._id === id);
    })

    const totalPrice = useMemo(()  => {
        if (preparedIngredients?.length) {
            return preparedIngredients?.reduce((total, ingredient) => {
                // @ts-ignore
                return total + ingredient?.price
            }, 0);
        }
    }, [preparedIngredients])


    const from = location.pathname.split('/').includes('feed') ? 'feed' : 'profile';

    return (
        <div className={`${orderCardStyles.container} p-6 mb-4`}>
            <Link
                className={orderCardStyles.button}
                to={from === 'feed' ? `/feed/${number}` : `/profile/orders/${number}`}
                state={{background: location, from}}
            />
            <div className={orderCardStyles.header}>
                <p className='text text_type_digits-default'>
                    { `#${number}` }
                </p>

                {createdAt ? (
                    <FormattedDate
                        className='text text_type_main-default text_color_inactive'
                        date={new Date(createdAt)}
                    />
                ) : (
                    <p className='text text_type_main-default text_color_inactive'>
                        Сегодня, 16:20
                    </p>
                )}
            </div>

            <p className='text text_type_main-medium'>
                { name }
            </p>

            <div className={orderCardStyles.footer}>
                <div className={orderCardStyles.preview}>
                    {preparedIngredients?.slice(0, 6).map((item, index) => (
                        <div
                            className={orderCardStyles['preview-item']}
                            style={{zIndex: 6 - index}}
                            key={index}
                        >
                            {/* @ts-ignore*/}
                            <img height={60} src={item?.image_mobile} alt={`${item?.name ?? 'Ингредиент бургера в заказе'}.`} />
                            {index === 5 && preparedIngredients?.length > 6 && (
                                <div
                                    className={orderCardStyles.overflow}
                                >
                                    <p className="text text_type_main-default">{`+${preparedIngredients?.length - 6}`}</p>
                                </div>
                            )}
                        </div>

                    ))}
                </div>

                <div className={`${orderCardStyles.price} mb-1`}>
                    <p className="text text_type_digits-default mr-2">
                        { totalPrice }
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    );
};

export default OrderCard;
