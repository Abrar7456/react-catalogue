import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../utils'
import './styles.css'

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id !== id)
    context.setCartProducts(filteredProducts)
  }

  const handleViewCart = () => {
    context.closeCheckoutSideMenu()
    navigate('/cart-summary')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-40 ${
          context.isCheckoutSideMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => context.closeCheckoutSideMenu()}
      />

      {/* Side Menu */}
      <aside
        className={`checkout-side-menu flex flex-col fixed right-0 z-50 
          border-l border-green-700/40 shadow-2xl 
          bg-gradient-to-b from-green-950 to-green-800
          text-white
          w-full sm:w-[360px] h-[calc(100vh-68px)] top-[68px]
          transform transition-transform duration-300 ease-in-out
          ${context.isCheckoutSideMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-green-700/40">
          <h2 className="font-semibold text-lg tracking-wide">🛒 My Order</h2>
          <XMarkIcon
            className="h-6 w-6 text-green-300 hover:text-green-100 cursor-pointer transition"
            onClick={() => context.closeCheckoutSideMenu()}
          />
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 space-y-3 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-900/40">
          {context.cartProducts.length > 0 ? (
            context.cartProducts.map((product) => (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.imageUrl}
                price={product.price}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center text-green-300 mt-6 italic">Your cart is empty</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-green-700/40 bg-green-950/40">
          <p className="flex justify-between items-center mb-3">
            <span className="font-light text-green-200">Total:</span>
            <span className="font-bold text-2xl text-green-300">
              ${totalPrice(context.cartProducts)}
            </span>
          </p>
          <button
            className="w-full py-3 rounded-lg 
              bg-gradient-to-r from-green-600 to-green-500 
              hover:from-green-500 hover:to-green-400
              text-black font-semibold shadow-lg transition"
            onClick={handleViewCart}
          >
            View Cart
          </button>
        </div>
      </aside>
    </>
  )
}

export default CheckoutSideMenu
