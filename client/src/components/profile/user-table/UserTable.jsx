export default function UserTable({ allUsers, handleChangeRole }) {
    return (
        <>
            <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900">All Users</h3>
            {allUsers.length === 0 ? (
                <p className="text-gray-500 text-lg">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 mt-4">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="border border-gray-300 px-4 py-3">Username</th>
                                <th className="border border-gray-300 px-4 py-3">Email</th>
                                <th className="border border-gray-300 px-4 py-3">Role</th>
                                <th className="border border-gray-300 px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user) => (
                                <tr key={user._id} className="bg-white border border-gray-300 text-center">
                                    <td className="border border-gray-300 px-4 py-3">{user.username}</td>
                                    <td className="border border-gray-300 px-4 py-3">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-3">{user.role}</td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <button
                                            onClick={() => handleChangeRole(user._id, user.role)}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300"
                                        >
                                            Change Role
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
