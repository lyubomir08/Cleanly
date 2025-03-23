export default function ServiceDeleteModal({ isOpen, onClose, onConfirm, isDeleting }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border border-gray-300">
                <h2 className="text-xl font-semibold text-gray-900">⚠️ Delete Service</h2>
                <p className="text-gray-600 mt-2">
                    Are you sure you want to delete this service? This action is irreversible.
                </p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    >
                        ❌ Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                    >
                        {isDeleting ? "Deleting..." : "🗑️ Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
