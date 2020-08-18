import { Document } from "mongoose";
import * as mongoose from "mongoose";

const TransactionsSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true 
  },
  compensation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "compensation",
    required: true
  }
})

export interface ITransaction extends Document{
  _id: string, 
  date: string, 
  transactionId: string, 
  method: string, 
  compensation: string 
}

export const Transaction = mongoose.model<ITransaction>(
  "transaction",
  TransactionsSchema
)