import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BlogSkeletonLoading() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="text-center mb-12">
                <Skeleton className="h-10 w-3/4 md:w-1/2 mx-auto mb-4 rounded-lg dark:bg-gray-800" />
                <Skeleton className="h-5 w-5/6 md:w-1/2 mx-auto rounded-lg dark:bg-gray-800" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="w-full lg:w-3/4">
                    {/* Search and Filter */}
                    <div className="mb-8">
                        <Skeleton className="h-12 w-full mb-4 rounded-lg dark:bg-gray-800" />
                        <div className="flex flex-wrap gap-3 mb-8">
                            {[1, 2, 3, 4].map((item) => (
                                <Skeleton key={item} className="h-10 w-24 rounded-full dark:bg-gray-800" />
                            ))}
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                                    <Skeleton className="w-full h-full dark:opacity-30" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        <Skeleton className="h-4 w-24 dark:bg-gray-700 rounded" />
                                        <span>•</span>
                                        <Skeleton className="h-4 w-24 dark:bg-gray-700 rounded" />
                                    </div>
                                    <Skeleton className="h-7 w-full mb-3 dark:bg-gray-700 rounded" />
                                    <div className="space-y-2 mb-4">
                                        <Skeleton className="h-4 w-full dark:bg-gray-700 rounded" />
                                        <Skeleton className="h-4 w-5/6 dark:bg-gray-700 rounded" />
                                        <Skeleton className="h-4 w-4/5 dark:bg-gray-700 rounded" />
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Skeleton className="h-6 w-16 dark:bg-gray-700 rounded-full" />
                                        <Skeleton className="h-6 w-20 dark:bg-gray-700 rounded-full" />
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                                        <Skeleton className="h-5 w-16 dark:bg-gray-700 rounded" />
                                        <Skeleton className="h-5 w-16 dark:bg-gray-700 rounded" />
                                        <Skeleton className="h-5 w-16 dark:bg-gray-700 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-1/4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <Skeleton className="h-6 w-1/3 mb-4 dark:bg-gray-700 rounded" />
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <Skeleton className="h-16 w-16 dark:bg-gray-700 rounded" />
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-3/4 mb-2 dark:bg-gray-700 rounded" />
                                        <Skeleton className="h-3 w-1/2 dark:bg-gray-700 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Skeleton className="h-6 w-1/3 mb-4 dark:bg-gray-700 rounded" />
                            <div className="flex flex-wrap gap-2">
                                {[1, 2, 3, 4, 5, 6].map((tag) => (
                                    <Skeleton key={tag} className="h-8 w-20 dark:bg-gray-700 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}