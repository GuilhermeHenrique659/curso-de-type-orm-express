import { IHashProvider } from "../models/IHashProvider";


class MockHashProvider implements IHashProvider
{


    public async genenerateHash(payload: string): Promise<string> {

        return payload
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return payload === hashed;
    }
}

const mockprovider = new MockHashProvider();

export default mockprovider