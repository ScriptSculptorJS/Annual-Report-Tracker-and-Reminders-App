import mongoose from 'mongoose';

const entitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  reminderFrequency: String,
  status: String,
  notes: String,
})

const userSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  entities: [entitySchema],
}, {
  timestamps: true // createdAt, updatedAt
});

const User = mongoose.model('User', userSchema);

export default User;