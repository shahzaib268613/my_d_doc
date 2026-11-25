import { Card, Skeleton } from '@/shared/components/ui'

export function BlogCardSkeleton() {
  return (
    <Card className="flex h-full w-full min-w-0 flex-col overflow-hidden border-border/80 p-0 shadow-sm">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="mt-1 h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </Card>
  )
}
