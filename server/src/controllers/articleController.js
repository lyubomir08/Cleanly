import articleService from "../services/articleService";

const createArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user.userId;

        const newArticle = await articleService.createArticle(title, content, author);
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await articleService.getAllArticles();
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getArticleById = async (req, res) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const updatedArticle = await articleService.updateArticle(req.params.id, req.user.userId, req.body);
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const result = await articleService.deleteArticle(req.params.id, req.user.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
};