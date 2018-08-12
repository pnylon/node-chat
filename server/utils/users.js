
class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = {
            id, 
            name,
            room
        }
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let user = this.getUser(id);
        //let user = this.users.filter((user) => user.id === id)[0];

        // if (user) {
        //     let index = this.users.indexOf(id);
        //     users.splice(index, 1);
        // };
        if (user) {
            // this.users = this.users.filter((user) => {
            //     return user.id !== id;
            // });
            // User shortened ES6 version.
            this.users = this.users.filter((user) => user.id !== id);            
        }

        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room) {
        // let users = this.users.filter((user) => {
        //     return user.room === room;
        // });
        // Use shorthand ES6 version.
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};

// class Person {
//     constructor (name, age) {
//         this.name = name,
//         this.page = age
//     }
//     getPersonDescription () {
//         return `${this.name} is ${this.page} years(s) old`;
//     }
// }

// let me = new Person('Kaley', 39);
// let meDescription = me.getPersonDescription();
// console.log(meDescription);