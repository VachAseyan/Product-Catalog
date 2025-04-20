import style from "./Product.module.css";

function Product({ id, title, price, category, image, addToBasket }) {
    return (
        <div className={style.productCard}>
            <div className={style.imageWrapper}>
                <img src={image} alt={title} className={style.productImage} />
            </div>
            <div className={style.detailsContainer}>
                <h3 className={style.productName}>{title}</h3>
                <p className={style.category}>{category}</p>
                <div className={style.priceRow}>
                    <span className={style.price}>${price}</span>
                    <button
                        className={style.addButton}
                        onClick={() => addToBasket({ id, title, price, category, image })}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;