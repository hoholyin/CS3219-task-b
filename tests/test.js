chai = require('chai');
chaiHttp = require('chai-http');
app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Contacts", () => {
    describe("GET /contacts", () => {
        // Test to get all contacts
        it ("should get all contacts", async () => {
            const res = await chai.request(app).get('/api/contacts');
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
        });
    });
});
