import React from "react";

export default function DeleteServiceModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold text-gray-900">⚠️ Изтриване на услуга</h2>
                <p className="text-gray-600 mt-2">Наистина ли искате да изтриете тази услуга? Това действие е необратимо.</p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    >
                        ❌ Отказ
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                    >
                        🗑️ Изтриване
                    </button>
                </div>
            </div>
        </div>
    );
}
