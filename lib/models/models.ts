import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LogSchema = new Schema({
    message: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
})