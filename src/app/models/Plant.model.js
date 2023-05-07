import mongoose, { Schema } from "mongoose"

const PlantSchema = new Schema(
    {
        name_plant: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        height: {
            type: Number
        },
        type_fruit: {
            type: String,
            trim: true
        },
        flora: {
            type: String
        },
        type_earth: {
            type: String,
            trim: true
        },
        light: {
            type: Number
        },
        clime: {
            type: "String",
            trim: true
        },
        humidity: {
            type: Schema.Types.Array
        },
        space_earth: {
            type: Number
        },
        specific_care: {
            type: String,
            trim: true
        },
        pests: {
            type: Schema.Types.Array
        },
        solutions: {
            type: Schema.Types.Array
        },
    },
    {
        timestamps: true
    }
)

PlantSchema.index({
    id_usuario: 1
})

const Plant = mongoose.model('Plant', PlantSchema)

export default Plant