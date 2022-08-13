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
}

export const userValidate = new UserRouterValidation();