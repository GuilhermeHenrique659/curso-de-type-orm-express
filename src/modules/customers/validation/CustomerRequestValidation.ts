import { Joi, Segments } from "celebrate";


class CustomerRequestValidation
{
    public IdParansIsValid()
    {
        return ({
            [Segments.PARAMS]: {
                id: Joi.string().uuid().required(),
            },
        });
    }
    public CreateBodyIsValid(){
        return ({
            [Segments.BODY]: {
                name: Joi.string().required(),
                email: Joi.string().email().required()
            }
        })
    }
    UpdateParansBodyIsValid(){
        return ({
            [Segments.BODY]: {
                name: Joi.string().required(),
                email: Joi.string().email().required()
            },
            [Segments.PARAMS]: {
                id: Joi.string().uuid().required(),
            },
        })
    }
}

export const customerRequestValidate = new CustomerRequestValidation();