import mongoose, { Schema } from "mongoose"

const UsuarioSchema = new Schema(
    {
        nick: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

UsuarioSchema.index({
    nick: 1
})

const Usuario = mongoose.model('Usuario', UsuarioSchema)

export default Usuario