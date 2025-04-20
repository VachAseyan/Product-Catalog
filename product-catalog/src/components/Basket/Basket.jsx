import style from "./Basket.module.css"

function Basket({ id, count, title, image, price, category, plyusCount, minusCount }) {
    return (
        <div key={id}>
            <div className={style.productCard}>
                <div className={style.imageContainer}>
                    <img src={image} alt={title} className={style.productImage} />
                </div>
                <div className={style.productDetails}>
                    <h3 className={style.productTitle}>{title}</h3>
                    <p className={style.productCategory}>{category}</p>
                    <div className={style.priceContainer}>
                        <span className={style.productPrice}>${price}</span>
                    </div>
                    <button onClick={() => plyusCount(id)}>+</button>
                    <p>{count}</p>
                    <button onClick={() => minusCount(id)}>-</button>
                </div>
            </div>
        </div>
    )
}

export default Basket;