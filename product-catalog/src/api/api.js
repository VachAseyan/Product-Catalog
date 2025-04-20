const API_URL = "https://fakestoreapi.com/products"

const fetchBooks = async () => {
    return fetch(API_URL)
        .then(res => res.json())
        .then(res => res)
}

export {
    fetchBooks
}