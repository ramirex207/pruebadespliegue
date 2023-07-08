import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email es requerido"],
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        , "Por favor ingrese un email válido"]
    },
    password: {
        type: String,
        required: [true, "Password es requerido"],
        minlength: [6, "Password debe tener al menos 6 caracteres"],
        select: false
    },
    fullname: {
        type: String,
        required: [true, "Nombre es requerido"],
        minlength: [3, "Nombre debe tener al menos 3 caracteres"],
        maxlength: [50, "Nombre debe tener máximo 50 caracteres"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    cellphone: {
        type: Number,
        required: [true, "Celular es requerido"],
        minlength: [8, "Celular debe tener al menos 8 caracteres"],
        match: [/^[0-9]+$/, "Celular debe ser numérico"]
    },
});
const User = models.User || model('User', userSchema)
export default User;
