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
                                            ON blog_entries.user_id = users.id ORDER BY id DESC;`)
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = BlogEntires;