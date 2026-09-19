import { createFileRoute } from '@tanstack/react-router'
import { CartProvider } from '@/lib/cart'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Shop } from '@/components/Shop'
import { WhyLuxa } from '@/components/WhyLuxa'
import { Promotion } from '@/components/Promotion'
import { Owners } from '@/components/Owners'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { CheckoutModal } from '@/components/CheckoutModal'

export const Route = createFileRoute('/')({
  component: LuxaHome,
})

function LuxaHome() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Shop />
        <WhyLuxa />
        <Promotion />
        <Owners />
        <FinalCta />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
    </CartProvider>
  )
}
