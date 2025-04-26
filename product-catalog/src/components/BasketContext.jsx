import { createContext, useReducer, useEffect } from "react";

export const BasketContext = createContext();
export const BasketDispatchContext = createContext()

export const ACTIONS = {
    ADD_TO_BASKET: "add-to-basket",
    PLYUS_COUNT: "plyus-count",
    DECREMENT_COUNT: "decrement-count",
    DELETE_PRODUCT: "delete-product"
};

const reducer = (state, action) => {
    const {
        type,
        payload
    } = action

    switch (type) {
        case ACTIONS.ADD_TO_BASKET: {
            let found = state.find(item => item.id === payload.id)
            if (!found) {
                return [...state, {
                    ...payload,
                    count: 1
                }]
            }
            return state.map(item => item.id === payload.id ? {
                ...item,
                count: item.count + 1
            } : item)
        }

        case ACTIONS.DELETE_PRODUCT: {
            return state.filter(item => item.id !== payload.id)
        }

        case ACTIONS.PLYUS_COUNT: {
            return state.map(item => item.id === payload.id ? {
                ...item,
                count: item.count + 1
            } : item)
        }
        
        case ACTIONS.DECREMENT_COUNT: {
            return state.map(item => item.id === payload.id && item.count > 1 ? {
                ...item,
                count: item.count - 1
            } : item)
        }
    }
};

export const BasketProvider = ({ children }) => {
    const [basket, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("basket-products")) ?? []);

    useEffect(() => {
        if (basket.length > 0) {
            localStorage.setItem("basket-products", JSON.stringify(basket));
        } else {
            localStorage.removeItem("basket-products");
        }
    }, [basket]);

    return (
        <BasketContext.Provider value={basket}>
            <BasketDispatchContext.Provider value={dispatch}>
                {children}
            </BasketDispatchContext.Provider>
        </BasketContext.Provider>
    );
};