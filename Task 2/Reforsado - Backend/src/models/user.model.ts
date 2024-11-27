import express from 'express';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a valid name."]
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true, select: false,
        },
        salt: {
            type: String,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        }
    }
})

export const UserModel = mongoose.model('User', UserSchema);