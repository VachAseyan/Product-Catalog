import { useContext } from "react";
import { ACTIONS, BasketDispatchContext } from "../BasketContext";
import style from "./Basket.module.css";

function Basket({ id, count, title, image, price, category }) {

    const dispatch = useContext(BasketDispatchContext)

    const plyusCount = () => {
        dispatch({ type: ACTIONS.PLYUS_COUNT, payload: { id } });
    };

    const minusCount = () => {
        dispatch({ type: ACTIONS.DECREMENT_COUNT, payload: { id } });
    };

    const deleteProd = () => {
        dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: { id } });
    };
    return (
        <div className={style.basketCard}>
            <div className={style.imageSection}>
                <img src={image} alt={title} className={style.itemImage} />
            </div>
            <div className={style.infoSection}>
                <h3 className={style.itemTitle}>{title}</h3>
                <p className={style.itemCategory}>{category}</p>
                <div className={style.priceSection}>
                    <span className={style.itemPrice}>${price.toFixed(2)}</span>
                </div>
                <div className={style.quantityControls}>
                    <button
                        className={style.quantityButton}
                        onClick={minusCount}
                    >
                        -
                    </button>
                    <span className={style.quantity}>{count}</span>
                    <button
                        className={style.quantityButton}
                        onClick={plyusCount}
                    >
                        +
                    </button>
                    <button
                        className={style.deleteButton}
                        onClick={deleteProd}
                        title="Remove item"
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Basket;