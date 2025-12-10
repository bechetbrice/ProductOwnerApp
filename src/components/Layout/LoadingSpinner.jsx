import { Loader } from 'lucide-react';

/**
 * LoadingSpinner - Indicateur de chargement pour lazy loading
 */
export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="text-center">
        <Loader className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
      </div>
    </div>
  );
};
