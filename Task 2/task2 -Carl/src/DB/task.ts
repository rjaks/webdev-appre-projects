import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  userId: string; // Add userId to associate tasks with users
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  userId: { type: String, required: true }, // Store the user ID
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);
