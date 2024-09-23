import mongoose from "../../../../shared/database/database";

const logSchema = new mongoose.Schema({
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  body: { type: Object, default: null },
});

export const logModel = mongoose.model('logs', logSchema);

