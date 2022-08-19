import { Joi, Segments } from "celebrate";


class OrderRequestValidation
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
               customer_id: Joi.string().uuid().required(),
               products: Joi.required(),
            }
        })
    }
}

export const orderRequestValidate = new OrderRequestValidation();