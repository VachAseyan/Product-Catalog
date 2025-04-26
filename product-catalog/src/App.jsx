import './App.css'
import { BasketProvider } from './components/BasketContext'
import ProductList from './components/ProductList/ProductList'

function App() {

  return (
    <>
      <BasketProvider>
        <ProductList />
      </BasketProvider>
    </>
  )
}

export default App
