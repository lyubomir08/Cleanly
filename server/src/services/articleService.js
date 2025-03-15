import Article from "../models/Article.js";

const createArticle = async (title, content, author) => {
    return await Article.create({ title, content, author });
};

const getAllArticles = async () => {
    return await Article.find().populate('author', 'username email');
};

const getArticleById = async (id) => {
    const article = await Article.findById(id).populate('author', 'username email');
    if (!article) throw new Error('Article not found');

    return article;
};

const updateArticle = async (id, userId, updateData) => {
    const article = await Article.findById(id);
    if (!article) throw new Error('Article not found');

    if (article.author.toString() !== userId) {
        throw new Error('Not authorized');
    }

    return await Article.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteArticle = async (id, userId) => {
    const article = await Article.findById(id);
    if (!article) throw new Error('Article not found');

    if (article.author.toString() !== userId) {
        throw new Error('Not authorized');
    }

    await Article.findByIdAndDelete(id);
    return { message: 'Article deleted successfully' };
};

export default {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
}