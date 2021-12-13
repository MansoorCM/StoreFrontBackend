import supertest from "supertest";
import { User, UserStore } from '../../models/user';
import app from "../../server";

const request = supertest(app)

describe('User route', () => {

    const user: User = {firstname: 'ray', lastname: 'dalio', password: 'bridgewater123'}
    let token: string
    const store = new UserStore();

    afterAll( async()=> {
        await store.deleteAll();
    })

    it('create method adds a User in the database', async() => {
        const result = await request.post('/user')
        .send({firstname: user.firstname, lastname: user.lastname, password: user.password})
        token = result.body
        expect(result.status).toBe(200)
    })

    it('index method returns all the users', async() => {
        const result = await request.get('/user').set('Authorization', 'Bearer ' + token)
        user.id = result.body[0].id
        expect(result.status).toBe(200)
    })
    
    it('show method returns the user with given id', async() => {
        const result = await request.get('/user/' + user.id).set('Authorization', 'Bearer ' + token)
        expect(result.status).toBe(200)
    })
})