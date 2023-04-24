import mongoose, { Schema } from "mongoose"

const HuertoSchema = new Schema(
    {
        id_usuario: {
            type: Schema.Types.ObjectId,
            required: true,
            trim: true
        },
        name_huerto: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

HuertoSchema.index({
    id_usuario: 1
})

const Huerto = mongoose.model('Huerto', HuertoSchema)

export default Huerto