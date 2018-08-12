const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Jeopse',
            room: 'Node'
        }, {
                id: '2',
                name: 'Zufron',
                room: 'React'
            }, {
                id: '3',
                name: 'Sauxsie',
                room: 'Node'
            }]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123456',
            name: 'Selmalik',
            room: 'Life After Life'
        };
        let responseUser = users.addUser(user.id, user.name, user.room);

        expect(responseUser).toMatchObject(user);
        // First users is the new instance and the second users is the array. This test needs the user object created here
        // to be equal to the array, after the user object was pushed into the array.
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = users.removeUser(userId);
        let size = users.users.length;
        expect(user.id).toBe(userId);
        expect(user.name).toBe('Jeopse');
        expect(size).toBe(2);
        expect(users.users).not.toHaveProperty('Jeopse');
    });

    it('should not remove user', ()=> {
        let userId = '68';
        let user = users.removeUser(userId);
        let size = users.users.length;
        
        expect(user).toBeUndefined();
        expect(size).toBe(3);
        //expect(users.users).toHaveProperty('Jeopse');
    });

    it('should find user', () => {
        let userId = '1';
        let user = users.getUser(userId);
        //let userObject = users.users.filter((user) => user.userId === '1');

        expect(userId).toBe(user.id);
        //expect(user).toMatchObject(userObject);
    });

    it('should not find user', () => {
        let userId = '5';
        let user = users.getUser(userId);

        expect(user).toBeUndefined();
    });

    it('should return names for Node room', () => {
        let userList = users.getUserList('Node');

        expect(userList).toEqual(['Jeopse', 'Sauxsie']);
    });

    it('should return names for React room', () => {
        let userList = users.getUserList('React');

        expect(userList).toEqual(['Zufron']);
    });    
});