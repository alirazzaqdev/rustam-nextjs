import AdminShell from '@/components/admin/AdminShell'
import { products } from '@/data/products'
import { Info } from 'lucide-react'

export default function AdminProductsPage() {
  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-sm text-gray-500 mb-6">
          {products.length} products loaded from <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">src/data/products.ts</code>
        </p>

        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-4 text-sm mb-6">
          <Info size={16} className="mt-0.5 shrink-0" />
          <p>
            Products are managed in code, not in the database. To add, edit, or remove a product,
            update the array in <code className="text-xs bg-blue-100 px-1.5 py-0.5 rounded">src/data/products.ts</code>
            and redeploy.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Brand</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Featured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{p.category}</td>
                    <td className="px-4 py-3 text-gray-500">{p.brand}</td>
                    <td className="px-4 py-3 text-gray-900">
                      {p.price > 0
                        ? `PKR ${p.price.toLocaleString('en-PK')}`
                        : <span className="text-amber-600 font-medium">Contact</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${p.inStock ? 'text-green-600' : 'text-red-500'}`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${p.featured ? 'text-amber-600' : 'text-gray-400'}`}>
                        {p.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
