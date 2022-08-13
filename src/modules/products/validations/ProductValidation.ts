import {  celebrate, Segments, Joi } from 'celebrate';


class ProductValidation 
{
    public IdParansIsValid(){
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
                price: Joi.number().precision(2).required(),
                quantity: Joi.number().required()
            }
        })
    }
    UpdateParansBodyIsValid(){
        return ({
            [Segments.BODY]: {
                name: Joi.string().required(),
                price: Joi.number().precision(2).required(),
                quantity: Joi.number().required()
            },
            [Segments.PARAMS]: {
                id: Joi.string().uuid().required(),
            },
        })
    }
}


const validate = new ProductValidation();

export default validate;