'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Product } from '@/types'

interface ProductsSectionProps {
  products: Product[]
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'solar-panels', label: 'Solar Panels' },
    { id: 'batteries', label: 'Batteries' },
    { id: 'inverters', label: 'Inverters' },
    { id: 'accessories', label: 'Accessories' },
  ]

  const filtered = products.filter((product) => {
    const categoryMatch =
      !selectedCategory ||
      selectedCategory === 'all' ||
      product.category === selectedCategory
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1]
    return categoryMatch && priceMatch
  })

  const maxPrice = Math.max(...products.map((p) => p.price))

  return (
    <section id="products" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Products</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Premium solar panels, batteries, inverters, and accessories for your energy needs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(cat.id === 'all' ? null : cat.id)
              }
              variant={
                (selectedCategory === null && cat.id === 'all') ||
                selectedCategory === cat.id
                  ? 'default'
                  : 'outline'
              }
              className={
                (selectedCategory === null && cat.id === 'all') ||
                selectedCategory === cat.id
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : ''
              }
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Price Range Slider */}
        <div className="mb-12 max-w-md mx-auto">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Price Range: PKR {priceRange[0].toLocaleString()} - PKR{' '}
            {priceRange[1].toLocaleString()}
          </label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                      <Zap size={48} />
                      <p className="mt-2 text-sm">{product.category}</p>
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                <CardHeader className="flex-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-slate-600 mt-2">
                    {product.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Specs */}
                  {product.specs && Object.keys(product.specs).length > 0 && (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(product.specs)
                        .slice(0, 2)
                        .map(([key, value]) => (
                          <div key={key}>
                            <p className="text-slate-500 capitalize">{key}</p>
                            <p className="font-semibold text-slate-900">
                              {String(value)}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Price & Status */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        PKR {product.price.toLocaleString()}
                      </p>
                      {product.warranty && (
                        <p className="text-xs text-slate-500">
                          {product.warranty} warranty
                        </p>
                      )}
                    </div>
                    <div>
                      {product.inStock ? (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 gap-2">
                    <ShoppingCart size={16} />
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600">
              No products found in this price range. Try adjusting your filters.
            </p>
          </div>
        )}

        {/* Results Count */}
        <div className="text-center mt-8 text-slate-600">
          Showing {filtered.length} of {products.length} products
        </div>
      </div>
    </section>
  )
}
