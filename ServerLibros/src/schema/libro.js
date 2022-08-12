import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LibroScheme = new Schema({
    id_libro: Number,
    name_libro: String,
    status: {
        tipo: Boolean,
        default: false
    }
});

export default mongoose.model('Autor', LibroScheme);