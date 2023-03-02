import mongoose from "mongoose";

export default class CRUD {
	model: mongoose.Model<any>;
	modelName: string = "";
	schema: mongoose.Schema;

	defaultUpdate = {
		upsert: true,
		new: true,
	};

	constructor(model: mongoose.Model<any>, schema: mongoose.Schema) {
		this.model = model;
		this.modelName = model?.modelName;
		this.schema = schema;
	}

	listAll(filter: mongoose.FilterQuery<any> = {}) {
		return new Promise((resolve: any, reject: any) => {
			this.model.find(filter).then((_data: any) => {
				resolve(_data);
			});
		});
	}

	getOne(filter: mongoose.FilterQuery<any> = {}) {
		return new Promise((resolve: any, reject: any) => {
			this.model.findOne(filter).then((_data: any) => {
				resolve(_data);
			});
		});
	}

	create(data: any) {
		return new Promise((resolve: any, reject: any) => {
			this.model
				.create(data)
				.then((_data: any) => {
					resolve(_data);
				})
				.catch((e: any) => {
					reject(e);
				});
		});
	}

	updateOne(
		filter: mongoose.FilterQuery<any>,
		update: mongoose.UpdateQuery<any>,
		options: mongoose.QueryOptions = this.defaultUpdate
	) {
		return new Promise((resolve: any, reject: any) => {
			this.model
				.findOneAndUpdate(filter, update, options)
				.then((_data: any) => {
					resolve(_data);
				})
				.catch((e: any) => {
					reject(e);
				});
		});
	}

	deleteOne(
		filter: mongoose.FilterQuery<any>,
		options: mongoose.QueryOptions = {}
	) {
		return new Promise((resolve, reject) => {
			this.model
				.findOneAndDelete(filter, options)
				.then((_data: any) => {
					console.log(_data);
					resolve(_data);
				})
				.catch((e: any) => {
					reject(e);
				});
		});
	}
}
