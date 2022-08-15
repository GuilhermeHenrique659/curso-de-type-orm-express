import User from "../typeorm/entities/users";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";
import ListUserService from "./ListUserService";
import ResetPasswordServices from "./ResetPasswordService";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import ShowUserProfileService from "./ShowUserProfileService";
import UploadAvatarUserService from "./UpdateAvatarUserService";
import UpdateProfileService from "./UpdateProfileService";

export default interface IUserServiceFactory
{
    GetCreateUserService(): CreateUserService;
    GetListUserService(): ListUserService;
    GetCreateSessionService(): CreateSessionService;
    GetUploadAvatarUserService(): UploadAvatarUserService;
    GetSendForgotPasswordEmailService(): SendForgotPasswordEmailService;
    GetResetPasswordService(): ResetPasswordServices;
    GetShowUserProfileService(): ShowUserProfileService;
    GetUpdateProfileService(): UpdateProfileService;
}