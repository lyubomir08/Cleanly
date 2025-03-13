const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Грешка в заявката");
    }
    return data;
};

export async function get(url) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
}

export async function post(url, data) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

export async function put(url, data) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "PUT",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

export async function del(url) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
}
