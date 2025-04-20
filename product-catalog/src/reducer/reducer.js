const ACTIONS = {
    ADD_TO_BASKET: "add-to-basket",
    PLYUS_COUNT: "plyus-count",
    DECREMENET_COUNT: "decrement-count",
    DELETE_PRODUCT: "delete-product"
};

const reducer = (state, action) => {
    const {
        type,
        payload
    } = action
    switch (type) {
        case ACTIONS.ADD_TO_BASKET: {
            const found = state.find(item => item.id === payload.id);
            if (!found) {
                return [...state, {
                    ...payload,
                    count: 1
                }];
            }
            return state.map(item => item.id === payload.id ? {
                    ...item,
                    count: item.count + 1
                } :
                item
            );
        }

        case ACTIONS.PLYUS_COUNT: {
            return state.map(item => item.id === payload.id ? {
                ...item,
                count: item.count + 1
            } : item)
        }

        case ACTIONS.DECREMENET_COUNT: {
            return state.map(item => item.id === payload.id && item.count > 1 ? {
                ...item,
                count: item.count - 1
            } : item)
        }

        case ACTIONS.DELETE_PRODUCT: {
            return state.filter(item => item.id !== payload.id)
        }

    }
};

export {
    reducer,
    ACTIONS
}