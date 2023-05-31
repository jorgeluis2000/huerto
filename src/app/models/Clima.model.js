import mongoose, { Schema } from "mongoose"

const ClimaSchema = new Schema(
    {
        id_huerto: {
            type: String,
            required: true,
            trim: true
        },
        temperatura: {
            type: Number
        },
        humedad: {
            type: Number
        },
        humedad_ambiental: {
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