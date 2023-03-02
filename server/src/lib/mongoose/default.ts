import mongoose from "mongoose";
//Default CRUD Class
import _CRUD from "./_CRUD";

//Example of Creating a mongoose collection
const DefaultModule = new mongoose.Schema({
	default: { type: String, required: true, unique: true },
});
const mDefaultModule = mongoose.model("defaultmodule", DefaultModule);

//Export CRUD Class for Plugin Usage
export const CRUD = new _CRUD(mDefaultModule, DefaultModule);
