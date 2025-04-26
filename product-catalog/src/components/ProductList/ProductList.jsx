import { useContext, useEffect, useState } from "react";
import { BasketContext, BasketDispatchContext } from "../BasketContext";
import style from "./ProductList.module.css";
import { fetchBooks } from "../../api/api";
import Product from "../Product/Product";
import Basket from "../Basket/Basket";
import basketIcon from "../../assets/basket.svg";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [basketMode, setBasketMode] = useState(true);
    const [total, setTotal] = useState(0);

    const basket = useContext(BasketContext);

    useEffect(() => {
        fetchBooks().then(setProducts);
    }, []);

    const toggleBasketMode = () => {
        setBasketMode(!basketMode);
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
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            category={product.category}
                            image={product.image}
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
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    category={product.category}
                                    image={product.image}
                                    count={product.count}

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