import style from "./Product.module.css";

function Product({ id, title, price, category, image, addToBasket }) {
    return (
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
                <button onClick={() => addToBasket({ id, title, price, category, image })}>Add to Basket</button>
            </div>
        </div>
    )
}

export default Product;