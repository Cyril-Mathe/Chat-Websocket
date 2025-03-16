// model pour la bdd
import Joi from "joi";
import mongoose from "mongoose";

const time = new Date();
const hoursandminutes = () => {
    const hours = String(time.getHours());
    const minutes = String(time.getMinutes());
    return `${hours}:${minutes}`;
}
const jour = String(time.getDate());
const mois = String(time.getMonth() + 1);
const annee = time.getFullYear();

const date1 = `${jour}/${mois}/${annee}`;

const chatSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    },
    date : {
        type: String,
        default: date1
    },
    hour : {
        type: String,
        default: hoursandminutes
    },
},
{ timestamps: true }
)

const chat = mongoose.model('chat', chatSchema)

const chatValidation = Joi.object({
    name: Joi.string()
    .required()
    .messages({
        'string.empty': 'Le nom est obligatoire'
    }),
    message: Joi.string()
    .required()
    .messages({
        'string.empty': 'Le message ne peut pas être vide'
    })
})

export { chat, chatValidation }