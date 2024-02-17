import notFound404PageStyles from './not-found-404-page.module.css';


const NotFound404Page = () => {
    return (
        <div className={notFound404PageStyles.container}>
            <h2 className='text text_type_digits-large mb-6'>
                4🪐4
            </h2>

            <p className="text text_type_main-medium text_color_inactive">
                Страница, возможно, затерялась в космосе
            </p>
        </div>
    );
};

export default NotFound404Page;
