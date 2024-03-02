import React from 'react';
import feedStatsStyles from './feed-stats.module.css'

const FeedStats = (): React.JSX.Element => {
    return (
        <section className={feedStatsStyles.container}>
            <div className={feedStatsStyles.status}>
                <div>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>

                    <div className={feedStatsStyles['status-text']}>
                        {[...Array(5)].map(() => (
                            <p className='text text_type_digits-default mb-2'>034533</p>
                        ))}
                    </div>
                </div>

                <div>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>

                    <div>
                        {[...Array(3)].map(() => (
                            <p className='text text_type_digits-default mb-2'>034538</p>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>

                <p className='text text_type_digits-large'>28 752</p>
            </div>

            <div>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>

                <p className='text text_type_digits-large'>138</p>
            </div>

        </section>
    );
};

export default FeedStats;
