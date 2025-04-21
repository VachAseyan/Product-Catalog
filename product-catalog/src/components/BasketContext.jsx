import { createContext, useReducer, useEffect } from "react";
import { reducer } from "../reducer/reducer";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {

    const [basket, dispatch] = useReducer(reducer,JSON.parse(localStorage.getItem("basket-products")) ?? []);
    
    useEffect(() => {
        if (basket.length > 0) {
            localStorage.setItem("basket-products", JSON.stringify(basket));
        } else {
            localStorage.removeItem("basket-products");
        }
    }, [basket]);

    return (
        <BasketContext.Provider value={{ basket, dispatch }}>
            {children}
        </BasketContext.Provider>
    );
};