import React, {useEffect, useMemo} from 'react';
import feedOrderDetailStyles from './feed-order-detail.module.css';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from '../../../services/store';
import { getOrderByNumber } from '../../../services/actions/order';
import {ORDER_STATUS, TIngredientData} from '../../../utils/types';
import {clearOrder} from '../../../services/reducers/feedOrder';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

type TFeedOrderDetailProps = {
    withOrderNumber?: Boolean,
}

const FeedOrderDetail = ({ withOrderNumber = true }: TFeedOrderDetailProps): React.JSX.Element => {
    const dispatch = useDispatch()
    const { number } = useParams()

    const { ingredients } = useSelector(store => store.ingredients);
    const order = useSelector(store => {
        let order;

        if (number && store.feedOrders.data) {
            order = store.feedOrders.data.orders.find(order => order.number === +number);

            return order;
        }

        if (number && store.feedOrdersProfile.data) {
            order = store.feedOrdersProfile.data.orders.find(order => order.number === +number);

            return order;
        }

        return store.feedOrder.order;
    })

    useEffect(() => {
        if(!order) {
            // @ts-ignore
            dispatch(getOrderByNumber(number));
        }

        return () => {
            // @ts-ignore
            dispatch(clearOrder());
        }
    }, [])

    const status: ORDER_STATUS = order?.status === 'done' ?
        ORDER_STATUS.Done : order?.status === 'pending' ?
            ORDER_STATUS.Pending : order?.status === 'created' ?
                ORDER_STATUS.Created : ORDER_STATUS.Unknown;


    const  preparedIngredients = useMemo(() => {
        return order?.ingredients?.reduce((resultList: Array<TIngredientData & {counter: number}>, id: string) => {
            const indexOfIngredient = resultList?.findIndex(item => item?._id === id);
            if (indexOfIngredient !== -1) {
                resultList[indexOfIngredient] = {
                    ...resultList[indexOfIngredient],
                    counter: resultList[indexOfIngredient].counter + 1,
                }
            } else {
                const extendedIngredient = ingredients.find((ingredient: TIngredientData) => ingredient._id === id)

                if (extendedIngredient) {
                    // @ts-ignore
                    resultList.push({...extendedIngredient, counter: 1})
                }
            }

            return resultList;
        }, [])
    }, [order?.ingredients])

    const totalPrice = useMemo(()  => {
        if (preparedIngredients?.length) {
            return preparedIngredients?.reduce((total, ingredient) => {
                // @ts-ignore
                return total + (ingredient.counter * ingredient?.price)
            }, 0);
        }
    }, [preparedIngredients])


    return (
        <div className={feedOrderDetailStyles.container}>
            {withOrderNumber && (
                <p className={`${feedOrderDetailStyles.header} text text_type_digits-default`}>
                    { order?.number }
                </p>
            )}

            <p className='text text_type_main-medium mt-5 mb-3'>
                { order?.name }
            </p>

            <p className={`${feedOrderDetailStyles.status} text text_type_main-default mb-15`}>
                { status }
            </p>

            <div className={`${feedOrderDetailStyles.content} mb-10`}>
                <p className='text text_type_main-medium mb-6'>Состав:</p>

                <ul className={`${feedOrderDetailStyles['content-list']} custom-scroll`}>
                    {preparedIngredients?.map((item: TIngredientData & {counter: number}, index: number) => (
                        <li className={feedOrderDetailStyles['content-list-item']} key={index}>
                            <div className={`${feedOrderDetailStyles['item-img']} mr-4`}>
                                {/* @ts-ignore*/}
                                <img height={60} src={item?.image_mobile} alt={`${item?.name ?? 'Ингредиент бургера в заказе'}.`} />
                            </div>

                            <p className={`${feedOrderDetailStyles.title} text text_type_main-default mr-4`}>
                                {/* @ts-ignore*/}
                                { item?.name ?? 'Неизвестный ингредиент'}
                            </p>

                            <div className={`${feedOrderDetailStyles.price} mb-1`}>
                                <p className="text text_type_digits-default mr-2">
                                    {item.counter}
                                    <span className="text text_type_main-default"> x </span>
                                    {item.price}
                                </p>

                                <CurrencyIcon type="primary" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={feedOrderDetailStyles.footer} >
                {order?.createdAt ? (
                    <FormattedDate
                        className='text text_type_main-default text_color_inactive'
                        date={new Date(order.createdAt)}
                    />
                ) : (
                    <p className='text text_type_main-default text_color_inactive'>
                        Дата уточняется
                    </p>
                )}

                <div className={`${feedOrderDetailStyles.price} mb-1`}>
                    <p className="text text_type_digits-default mr-2">
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default FeedOrderDetail;
