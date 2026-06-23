'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Category from './category';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Accueil</Link>
          <Category />
          {/* <Link href="/cart" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Panier</Link> */}
          <Link href="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mon Compte</Link>
        </nav>
      )}
    </>
  );
}
