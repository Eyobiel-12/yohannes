import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="aspect-[16/9] w-full rounded-lg mb-8" />

              <div className="mb-8">
                <Skeleton className="h-10 w-full mb-8" />

                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                <Skeleton className="h-6 w-48 mt-8 mb-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />

                <Skeleton className="h-6 w-48 mt-8 mb-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            <div>
              <div className="mb-8">
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </div>

              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <div className="p-6 bg-white rounded-b-lg border border-gray-100 shadow-md">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
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
