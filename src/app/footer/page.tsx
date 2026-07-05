import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-xl font-bold mb-4">Boutique</h3>
            <p className="text-gray-300 text-sm">
              Découvrez nos meilleurs produits aux meilleurs prix.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/category/electronics">Electronics</Link></li>
              <li><Link href="/category/home-garden">Home & Garden</Link></li>
              <li><Link href="/category/sports">Sports & Outdoor</Link></li>
              <li><Link href="/category/clothes">Vêtement</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about">À propos</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Livraison</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Mon compte</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/account">Mon compte</Link></li>
              <li><Link href="/cart">Mon panier</Link></li>
              <li><Link href="/orders">Mes commandes</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-600 mt-8 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Boutique. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}