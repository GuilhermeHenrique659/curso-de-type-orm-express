import { compare, hash } from "bcryptjs"
import { IHashProvider } from "../models/IHashProvider";


class BcryptHashProvider implements IHashProvider
{


    public async genenerateHash(payload: string): Promise<string> {
        const stepHash = 8
        return await hash(payload, 8);
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return await compare(payload, hashed);
    }
}

const bcryptprovider = new BcryptHashProvider();

export default bcryptprovider