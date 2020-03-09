const db = require('./conn')

class Comments {
    constructor(id, user_id, blog_id, comment){
        this.id = id;
        this.user_id = user_id;
        this.blog_id = blog_id;
        this.comment = comment;
    }

    async addComment(){
        try {
            const response = await db.one(`INSERT INTO comments (user_id, blog_id, comment)  
            VALUES ($1, $2, $3) RETURNING id;`,
            [this.user_id, this.blog_id, this.comment])
            return response;
        } catch (error) {
            console.log(err);
            return err;
        }
    }
}

module.exports = Comments;