let expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object' , () => {
        let newMessage = {
            from: 'Bobo',
            text: 'I am done with it',
        }
        let message = generateMessage(newMessage.from, newMessage.text);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(newMessage.from);
        expect(message.text).toBe(newMessage.text);
        expect(message).toMatchObject(newMessage);

        // request(app)
        //     .send({mesage})
        //     .expect(200)
        //     .expect((res) => {
        //         expect(res.message.from).toBe(message.from);
        //         expect(res.message.text).toBe(message.text);
        //         expect(typeof res.message.createdAt).toBe('number');
        //     })
        //     .end(done);
    });
})