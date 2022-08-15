import EtherealMail from "@config/mail/EtherealMail";
import AppError from "@shared/errors/AppError";
import IUserRepository from "../typeorm/repositories/IUserRepository";
import IUserTokenRepository from "../typeorm/repositories/IUserTokenRepository";

interface IRequest
{
    email: string
}

export default class SendForgotPasswordEmailService
{
    private userRepository: IUserRepository;

    private tokenRepository: IUserTokenRepository;

    constructor(userRepository: IUserRepository, tokenRepository: IUserTokenRepository){
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    public async execute({ email }: IRequest): Promise<void>
    {
        
        let user = await this.userRepository.findByEmail(email);
        
        
        if(!user){
            throw new AppError("user does not exists.")
        }
        let user_token = await this.tokenRepository.generate(user.id);

        await EtherealMail.sendMail({
            to: email,
            body: `Solicitacao de redefinir a senha recebida. Token: ${user_token?.token}`,
        })
    }
}