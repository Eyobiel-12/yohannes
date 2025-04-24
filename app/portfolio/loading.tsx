import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="flex justify-center mb-12">
            <Skeleton className="h-10 w-full max-w-4xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col">
                  <Skeleton className="h-64 w-full rounded-t-lg" />
                  <div className="p-6 bg-white rounded-b-lg border border-gray-100 shadow-md">
                    <div className="flex space-x-4 mb-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex space-x-2 mb-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
