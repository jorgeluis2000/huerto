import mongoose, { Schema } from "mongoose"

const ClimaSchema = new Schema(
    {
        id_arduino: {
            type: Schema.Types.ObjectId,
            required: true,
            trim: true
        },
        temperatura: {
            type: Number
        },
        humedad: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

ClimaSchema.index({
    id_arduino: 1
})

const Clima = mongoose.model('Clima', ClimaSchema)

export default Clima