import { useEffect, useReducer, useState } from "react";
import style from "./ProductList.module.css";
import { fetchBooks } from "../../api/api";
import Product from "../Product/Product";
import basket from "../../assets/basket.svg"
import Basket from "../Basket/Basket";

// const ACTIONS = {
//     ADD_TO_BASKET: "add-to-basket"
// };

// const reducer = (state, action) => {
//     const { type, payload } = action
//     switch (action.type) {
//         case ACTIONS.ADD_TO_BASKET: {
//             const product = action.payload;
//             const found = state.find(item => item.id === product.id);
//             if (!found) {
//                 return [...state, { ...product, count: 1 }];
//             }
//             return state.map(item => item.id === product.id
//                     ? { ...item, count: item.count + 1 }
//                     : item
//             );
//         }
//     }
// };

function ProductList() {
    const [products, setProducts] = useState([]);
    const [basketMode, setBasketMode] = useState([])
    const [basketProducts, setBasketProducts] = useState([])
    const [total, setTotal] = useState(0)
    // const [allProducts, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        fetchBooks().then(res => {
            setProducts(res);
        });
    }, []);

    const toggleBasketMode = () => {
        setBasketMode(!basketMode)
    }

    const addToBasket = (product) => {
        setBasketProducts(prev => {
            let found = prev.find(item => item.id === product.id)
            if (!found) {
                return [...prev, { ...product, count: 1 }]
            } else {
                return prev.map(item => item.id === product.id ? { ...item, count: item.count + 1 } : item)
            }

        })
    }

    const plyusCount = (id) => {
        setBasketProducts(prev =>
            prev.map(item => item.id === id ? { ...item, count: item.count + 1 } : item)
        )
    }

    const minusCount = (id) => {
        setBasketProducts(prev =>
            prev.map(item => item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item)
        )
    }

    useEffect(() => {
        setTotal(basketProducts.reduce((curr, item) => curr + item.price * item.count, 0))
    }, [basketProducts])

    return (
        <div className={style.mainContainer}>
            <h1>Product Catalog</h1>
            <img
                className={style.icon}
                onClick={toggleBasketMode}
                src={basket}
                alt="Shopping basket"
                title={basketMode ? "View basket" : "View products"}
            />

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
                <div className={style.basketContainer}>
                    <div className={style.totalPrice}>
                        Total: ${total.toFixed(2)}
                    </div>

                    {basketProducts.length > 0 ? (
                        <div className={style.basketItems}>
                            {basketProducts.map(product => (
                                <Basket
                                    key={product.id}
                                    {...product}
                                    plyusCount={plyusCount}
                                    minusCount={minusCount}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={style.emptyBasket}>
                            Your basket is empty
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductList;
