import article from "../models/Article.js";

class ArticleController {
    
    static async listArticles (req, res) {
        try {
            const listArticles = await article.find({});
        res.status(200).json(listArticles);

        } catch (error) {
            res.status(500).json({ message: '${error.message} - requistion has failed'});
        }
        };
        
    
        static async listArticleById (req, res) {
            try {
                const id = req.params.id;
                const foundArticle = await article.findById(id);
            res.status(200).json(foundArticle);
    
            } catch (error) {
                res.status(500).json({ message: '${error.message} - article requistion has failed'});
            }
            };


            static async updateArticle (req, res) {
                try {
                    const id = req.params.id;
                    await article.findByIdAndUpdate(id, req.body);
                res.status(200).json({message: "article updated"});
        
                } catch (error) {
                    res.status(500).json({ message: '${error.message} - article update has failed'});
                }
                };



    static async submitArticle (req, res){
        try {
            const newArticle = await article.create(req.body);
            res.status(201).json({ message: "submitted succesfully", article: newArticle});
        } catch (error){
            res.status(500).json({ message: '${error.message} - error submitting article'});

        }
    };

    static async deleteArticle (req, res) {
        try {
            const id = req.params.id;
            await article.findByIdAndDelete(id);
        res.status(200).json({message: "article deleted"});

        } catch (error) {
            res.status(500).json({ message: '${error.message} - article deletion has failed'});
        }
        };


};

export default ArticleController;
