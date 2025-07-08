import Skeleton from 'react-loading-skeleton';
export default function SkeletonBlog() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Back button skeleton */}
            <div className="mb-8 w-24">
                <Skeleton height={32} />
            </div>

            {/* Header skeleton */}
            <div className="mb-8 text-center max-w-2xl mx-auto">
                <Skeleton height={32} className="mb-4 mx-auto" width="75%" />
                <Skeleton height={20} width="50%" className="mx-auto" />
            </div>

            {/* Featured image skeleton */}
            <div className="w-full mb-8">
                <Skeleton height={400} className="rounded-lg" />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Main content skeleton */}
                <div className="md:w-2/3">
                    {/* Blog content */}
                    <div className="space-y-4 mb-12">
                        <Skeleton count={5} />
                        <Skeleton width="75%" />
                    </div>
                </div>
            </div>
        </div>
    );
}