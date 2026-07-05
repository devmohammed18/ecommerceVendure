export default function Loading() {
  return (
    <section className="bg-gray-50">

      {/* Hero skeleton */}
      <div className="w-full h-96 bg-gray-800 animate-pulse flex items-center justify-center">
        <div className="w-32 h-8 bg-gray-600 rounded" />
      </div>

      <div className="max-w-7xl mx-auto py-6">
        {/* Titre skeleton */}
        <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-6" />

        {/* Grille produits skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center gap-3"
            >
              {/* Image skeleton */}
              <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse" />
              {/* Titre skeleton */}
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
              {/* Prix skeleton */}
              <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}