import { get, post, put, del } from "./api.js";

const endpoints = {
    all: "/articles",
    byId: (id) => `/articles/${id}`,
    create: "/articles",
    update: (id) => `/articles/${id}`,
    delete: (id) => `/articles/${id}`,
};

export async function getAllArticles() {
    return await get(endpoints.all);
}

export async function getArticleById(id) {
    return await get(endpoints.byId(id));
}

export async function createArticle(articleData) {
    return await post(endpoints.create, articleData);
}

export async function updateArticle(id, articleData) {
    return await put(endpoints.update(id), articleData);
}

export async function deleteArticle(id) {
    return await del(endpoints.delete(id));
}
