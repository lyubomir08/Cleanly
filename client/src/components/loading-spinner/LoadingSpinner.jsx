export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center h-40">
            <div data-testid="loading-spinner" className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-800 border-opacity-50"></div>
        </div>
    );
}
