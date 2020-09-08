chai = require('chai');
chaiHttp = require('chai-http');
app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe("Contacts", () => {
    var contact_id = '';
    describe("GET /contacts", () => {
        // Test to get all contacts
        it ("should get all contacts", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        }).timeout(10000);
    });
    describe("POST /contacts", () => {
        afterEach((done) => {
            chai.request(app)
                .delete('/api/contacts/' + contact_id) 
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Contact deleted');
                    done();
                });
        })
        // Test to get all contacts
        it ("should add new contact", (done) => {
            chai.request(app)
                .post('/api/contacts')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'sally',
                    email: 'sally@mail.com',
                    phone: '999',
                    gender: 'female'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('New contact created!');
                    const dataObject = res.body.data;
                    expect(dataObject.name).to.equal('sally');
                    expect(dataObject.email).to.equal('sally@mail.com');
                    expect(dataObject.phone).to.equal('999');
                    expect(dataObject.gender).to.equal('female');
                    contact_id = dataObject._id;
                    done();
                });
        }).timeout(10000);
    });
    describe("GET /contacts/:contact_id", () => {
        beforeEach((done) => {
            chai.request(app)
                .post('/api/contacts')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'sally',
                    email: 'sally@mail.com',
                    phone: '999',
                    gender: 'female'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    const dataObject = res.body.data;
                    contact_id = dataObject._id;
                    done();
                });
        });
        afterEach((done) => {
            chai.request(app)
                .delete('/api/contacts/' + contact_id) 
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Contact deleted');
                    done();
                });
        })
        // Test to get all contacts
        it ("should retrieved contact by id", (done) => {
            chai.request(app)
                .get('/api/contacts/' + contact_id) 
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Contact details loading..');
                    const dataObject = res.body.data;
                    expect(dataObject.name).to.equal('sally');
                    expect(dataObject.email).to.equal('sally@mail.com');
                    expect(dataObject.phone).to.equal('999');
                    expect(dataObject.gender).to.equal('female');
                    done();
                });
        }).timeout(10000);
    });
    describe("PATCH /contacts/:contact_id", () => {
        beforeEach((done) => {
            chai.request(app)
                .post('/api/contacts')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'sally',
                    email: 'sally@mail.com',
                    phone: '999',
                    gender: 'female'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    const dataObject = res.body.data;
                    contact_id = dataObject._id;
                    done();
                });
        });
        afterEach((done) => {
            chai.request(app)
                .delete('/api/contacts/' + contact_id) 
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Contact deleted');
                    done();
                });
        })
        // Test to get all contacts
        it ("should update contact by id", (done) => {
            chai.request(app)
                .patch('/api/contacts/' + contact_id)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'sally2',
                    email: 'sally@mail.com',
                    phone: '999',
                    gender: 'female'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Contact Info updated');
                    const dataObject = res.body.data;
                    expect(dataObject.name).to.equal('sally2');
                    expect(dataObject.email).to.equal('sally@mail.com');
                    expect(dataObject.phone).to.equal('999');
                    expect(dataObject.gender).to.equal('female');
                    done();
                });
        }).timeout(10000);
    });
    describe("DELETE /contacts/:contact_id", () => {
        beforeEach((done) => {
            chai.request(app)
                .post('/api/contacts')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'sally',
                    email: 'sally@mail.com',
                    phone: '999',
                    gender: 'female'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    const dataObject = res.body.data;
                    contact_id = dataObject._id;
                    done();
                });
        });
        // Test to get all contacts
        it ("should delet contact by id", (done) => {
            chai.request(app)
                .delete('/api/contacts/' + contact_id) 
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Contact deleted');
                    done();
                });
        }).timeout(10000);
    });
});
