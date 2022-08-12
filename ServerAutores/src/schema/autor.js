import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AutorScheme = new Schema({
    id_autor: Number,
    number_document: Number,
    name_autor: String,
    lastname_autor: String,
    status: {
        tipo: Boolean,
        default: false
    }
});

export default mongoose.model('Autor', AutorScheme);