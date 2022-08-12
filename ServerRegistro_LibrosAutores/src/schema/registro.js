import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RegistroScheme = new Schema({
    id_libro: Number,
    id_autor: String,
    status: {
        tipo: Boolean,
        default: false
    }
});

export default mongoose.model('Registro', RegistroScheme);