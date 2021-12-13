import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User model', () => {

    const user: User = {firstname: 'ray', lastname: 'dalio', password: 'bridgewater123'}

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    })

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    })

    it('index function should return empty array', async() => {
        const result = await store.index()
        expect(result).toEqual([]);
    })

    it('create method adds a User in the database', async() => {
        const result: User = await store.create(user)
        expect(result.firstname).toEqual(user.firstname);
        expect(result.lastname).toEqual(user.lastname);
        user.id = result.id
    })

    it('show method returns the User with the given id', async() => {
        const result: User = await store.show(user.id as unknown as string)
        expect(result.firstname).toEqual(user.firstname);
        expect(result.lastname).toEqual(user.lastname);
    })
})