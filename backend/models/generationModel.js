import mongoose from 'mongoose'


const generationSchema = mongoose.Schema(
  {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: false
      },
      subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subcategory'
      }
  },
  {
      timestamps: true
  }
);


const Generation = mongoose.model('Generation', generationSchema);

export default Generation;