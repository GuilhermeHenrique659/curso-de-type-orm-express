import {  celebrate, Segments, Joi } from 'celebrate';


class UserRouterValidation
{
    public CreateBodyIsValid(){
        return ({
            [Segments.BODY]: {
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        });
    }
    public SessionCreateBodyIsValid()
    {
        return ({
            [Segments.BODY]: {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        });
    }
    public ForgotBodyIsValid()
    {
        return ({
            [Segments.BODY]: {
                email: Joi.string().email().required(),
            }
        });
    }
    public ResetBodyIsValid()
    {
        return ({
            [Segments.BODY]: {
                token: Joi.string().uuid().required(),
                password: Joi.string().required(),
                password_confirm: Joi.string().required().valid(
                    Joi.ref("password")
                ),
            }
        })
    }
    public UploadBodyIsvalid()
    {
        return ({
            [Segments.BODY]: {
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                old_password: Joi.string().required(),
                password: Joi.string().optional(),
                password_confirm: Joi.string().valid(
                    Joi.ref("password")
                ).when("password", {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
            }
        })
    }
}

export const userValidate = new UserRouterValidation();