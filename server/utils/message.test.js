let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

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
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let newLocationMessage ={
            from: 'Tomtom',
            latitude: '34.889728',
            longitude: '-120.418304'
        };
        let url = 'https://www.google.com/maps?q=34.889728,-120.418304';
        let message = generateLocationMessage(newLocationMessage.from, newLocationMessage.latitude, newLocationMessage.longitude);
        let result = {
            from: 'Tomtom',
            url
        };

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(newLocationMessage.from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${newLocationMessage.latitude},${newLocationMessage.longitude}`);
        expect(result).toMatchObject(result);
    });
});
