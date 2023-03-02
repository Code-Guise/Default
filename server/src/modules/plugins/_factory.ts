import { Router } from "express";
import { Auth } from "../../lib/passport/passport";

export default class DEFAULT {
	router = Router();
	CRUD: any;
	constructor(useAuth: boolean = true, CRUD: any = null) {
		//Use Authentication?
		if (useAuth) this.router.use(Auth);

		//If this route uses CRUD, loads only the basic CRUD functionalities
		//Complex CRUD functionalities must be stated in the "caller". If required functionalities is not available, have to create it in the _CRUD.ts file
		if (CRUD) {
			this.CRUD = CRUD;
			this.databaseGet();
			this.databaseAdd();
			this.databaseDelete();
			this.databaseUpdate();
		}
	}

	databaseGet() {
		this.router.get("/", (req: any, res: any) => {
			const filter = req.query;
			this.CRUD.listAll(filter)
				.then((result: any) => {
					res.send(result);
				})
				.catch((e: any) => {
					res.status(400).send({ error: e });
				});
		});
	}

	databaseAdd() {
		this.router.post("/", (req: any, res: any) => {
			const data = req.body;
			this.CRUD.create(data)
				.then((result: any) => {
					res.send(result);
				})
				.catch((e: any) => {
					res.status(400).send({ error: e });
				});
		});
	}

	databaseUpdate() {
		this.router.put("/", (req: any, res: any) => {
			const data = req.body.data;
			const filter = req.body.filter;
			const options = req.body.options;
			this.CRUD.updateOne(filter, data, options)
				.then((result: any) => {
					res.send(result);
				})
				.catch((e: any) => {
					res.status(400).send({ error: e });
				});
		});
	}

	databaseDelete() {
		this.router.delete("/", (req: any, res: any) => {
			const filter = req.query;
			this.CRUD.deleteOne(filter)
				.then((result: any) => {
					res.send(result);
				})
				.catch((e: any) => {
					res.status(400).send({ error: e });
				});
		});
	}
}
