import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../BasketContext";
import { ACTIONS } from "../../reducer/reducer";
import style from "./ProductList.module.css";
import { fetchBooks } from "../../api/api";
import Product from "../Product/Product";
import Basket from "../Basket/Basket";
import basketIcon from "../../assets/basket.svg";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [basketMode, setBasketMode] = useState(true);
    const [total, setTotal] = useState(0);

    const { basket, dispatch } = useContext(BasketContext);

    useEffect(() => {
        fetchBooks().then(setProducts);
    }, []);

    const toggleBasketMode = () => {
        setBasketMode(prev => !prev);
    };

    const addToBasket = (product) => {
        dispatch({ type: ACTIONS.ADD_TO_BASKET, payload: { ...product } });
    };

    const plyusCount = (id) => {
        dispatch({ type: ACTIONS.PLYUS_COUNT, payload: { id } });
    };

    const minusCount = (id) => {
        dispatch({ type: ACTIONS.DECREMENET_COUNT, payload: { id } });
    };

    const deleteProd = (id) => {
        dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: { id } });
    };

    useEffect(() => {
        setTotal(basket.reduce((curr, item) => curr + item.price * item.count, 0));
    }, [basket]);

    return (
        <div className={style.appContainer}>
            <h1 className={style.title}>Product Catalog</h1>
            <img
                className={style.basketIcon}
                onClick={toggleBasketMode}
                src={basketIcon}
                alt="Shopping basket"
            />
            {basket.length > 0 && (
                <div className={style.allCount}>
                    {basket.reduce((curr, item) => curr + item.count, 0)}
                </div>
            )}
            {basketMode ? (
                <div className={style.productsGrid}>
                    {products.map(product => (
                        <Product
                            key={product.id}
                            {...product}
                            addToBasket={addToBasket}
                        />
                    ))}
                </div>
            ) : (
                <div className={style.basketView}>
                    <div className={style.totalContainer}>
                        <h2 className={style.totalLabel}>Total:</h2>
                        <span className={style.totalAmount}>${total.toFixed(2)}</span>
                    </div>
                    {basket.length > 0 ? (
                        <div className={style.basketItems}>
                            {basket.map(product => (
                                <Basket
                                    key={product.id}
                                    {...product}
                                    plyusCount={plyusCount}
                                    minusCount={minusCount}
                                    deleteProd={deleteProd}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={style.emptyBasket}>
                            <div className={style.emptyIcon}>🛒</div>
                            <p className={style.emptyText}>Your basket is empty</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductList;