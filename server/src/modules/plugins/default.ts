//Default ROUTER Class
import RC from "./_factory";
//CRUD must be taken from related mongodb
//Best practise: both mongoose and current file has the same name
import { CRUD } from "../../lib/mongoose/default";

const useAuth = false;
// const rc = new RC(useAuth, null);
const rc = new RC(useAuth, CRUD);

//Use Router to enable requests (get,post,put,update)
const _route = rc.router;

/*EXTRAS
You can create Custom Routes if:
    1. Required complex CRUD functionalities
    2. Wanted custom routes (note: If CRUD is used, do not use ("/") as all requests are already called in factory.ts)
    3. Required usage of some other functions (self create or other modules)
*/

//Custom Routes
_route.get("/test", (req: any, res: any) => {
	res.send("test successful");
});

//Custom Routes with CRUD Class
_route.get("/12345", (req: any, res: any) => {
	CRUD.listAll()
		.then((result: any) => {
			res.send(result);
		})
		.catch((e: any) => {
			res.status(404).send(e);
		});
});

//Custom Routes with functions
_route.get("/text", (req: any, res: any) => {
	res.send(basicText());
});

const basicText = () => {
	return "This is very basic text";
};

module.exports = _route;
