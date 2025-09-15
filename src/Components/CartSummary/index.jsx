import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../utils'
import Layout from '../Layout'

const CartSummary = () => {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }
    
    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.setSearchByTitle(null)
    navigate('/my-orders/last')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white px-4 py-8">
      <Layout>
        {/* Header */}
        <div className="flex items-center justify-center relative w-full max-w-lg mx-auto mb-8">
          <button 
            className="absolute left-0 flex items-center justify-center bg-green-900 hover:bg-green-800 p-2 rounded-full shadow-md transition"
            onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="h-6 w-6 text-white"/>
          </button>
          <h1 className="font-extrabold text-2xl tracking-wide">Cart Summary</h1>
        </div>
        
        {/* Cart Items */}
        <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
          {context.cartProducts.length > 0 ? (
            context.cartProducts.map(product => (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.image_urls?.[0]}
                price={product.price}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-green-900/40 rounded-xl shadow-md border border-green-700">
              <p className="text-lg font-light">Your cart is empty 🛒</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {context.cartProducts.length > 0 && (
          <div className="bg-green-900/40 backdrop-blur-sm border border-green-700 rounded-xl px-6 py-6 mt-8 w-full max-w-lg mx-auto shadow-lg">
            <p className="flex justify-between items-center mb-4 text-lg">
              <span className="font-light">Total:</span>
              <span className="font-bold text-2xl text-green-300">
                ${totalPrice(context.cartProducts)}
              </span>
            </p>

            {context.isUserAuthenticated ? (
              <button
                className="bg-green-700 hover:bg-green-600 py-3 text-white w-full rounded-lg font-semibold shadow-lg transition"
                onClick={handleCheckout}>
                Checkout
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  className="bg-green-700 hover:bg-green-600 py-3 text-white w-full rounded-lg font-semibold shadow-lg transition"
                  onClick={() => navigate('/sign-in')}>
                  Sign In
                </button>
                <button
                  className="bg-transparent border-2 border-green-400 text-green-300 hover:bg-green-800 py-3 w-full rounded-lg font-semibold shadow-lg transition"
                  onClick={() => navigate('/sign-up')}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </Layout>
    </div>
  )
}

export default CartSummary
