import mongoose from 'mongoose';

/**
 * Subcategory Schema
 */
const subcategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Category'
        }
    },
    {
        timestamps: true
    }
);

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

export default Subcategory;