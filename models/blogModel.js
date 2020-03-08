const db = require('./conn')

class BlogEntires {
    constructor(id, user_id, title, blog){
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.blog = blog;
    }

    static async getBlogEntries(){
        try {
            const response = await db.any(`SELECT blog_entries.id, username, title, blog, email 
                                            FROM blog_entries INNER JOIN users 
                                            ON blog_entries.user_id = users.id ORDER BY id DESC;`);
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async getOneBlog(id){
        try {
            const response = await db.one(`SELECT blog_entries.id, username, title, blog, email 
                                            FROM blog_entries INNER JOIN users 
                                            ON blog_entries.user_id = users.id WHERE blog_entries.id = ${id};`);
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async getBlogComments(blog_id){
        try {
            const response = await db.any(`SELECT users.id, comment, username, email 
                                            FROM comments INNER JOIN users 
                                            ON comments.user_id = users.id WHERE comments.blog_id = ${blog_id};`);
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    
}

module.exports = BlogEntires;