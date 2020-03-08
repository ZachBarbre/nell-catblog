const db = require('./conn');
const bcrypt = require('bcryptjs');

class Users {
    constructor(id, username, email, password, isAdmin){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
      }

    async addUser(){
        try {
            const response = await db.one(`INSERT INTO users (username, email, password, is_admin)  
                                        VALUES ($1, $2, $3, $4) RETURNING id;`,
                                        [this.username, this.email, this.password, this.isAdmin]);
            return response;
        } catch (error) {
            console.log(error);
            return error;   
        }
    }

    async loginUser(){
        try {
            const response = await db.one(`SELECT id, username, email, password, is_admin FROM users WHERE email = ($1);`,[this.email]);
            const isValid = this.checkPassword(response.password);
            if (!!isValid){
                const { id, username, email, is_admin } = response;
                return { isValid, id, username, email, is_admin };
            } else {
                return isValid;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = Users;