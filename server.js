import serveStatic from "serve-static";
import {createServer} from "node:http";
import {Router} from "./router.js";

function notFound(request, response) {
    response.writeHead(404, "Not found");
    response.end("<h1>Not Found</h1>");
}

class MyServer {
    constructor(views) {
        this.views = views;
        
        let fileServer = serveStatic("./public");
        this.server = createServer((request, response) => {
            serveFromRouter(this, request, response, () => {
                fileServer(request, response,
                    () => notFound(request, response));
                });
            });
        }
        start(port) {
            this.server.listen(port);
        }
        stop() {
            this.server.close();
        }
}

const router = new Router();
const defaultHeaders = {"Content-type": "text/plain"};

async function serveFromRouter(server, request, response, next) {
    let resolved = await router.resolve(request, server).catch(error => {
        if(error.status != null) return error;
        return {body: String(err), status: 500};
    });
    if (!resolved) return next();
    let {body, status = 200, headers = defaultHeaders} = await resolved;
    response.writeHead(status, headers);
    response.end(body);
};

router.add("GET", /^\/views\/(chapo|lackham)$/, async(server, part) => { // may have to include error
    const sectionId = part;
    const count = server.views[sectionId] || 0;
    return {body: JSON.stringify({click: count}),
    headers: {"Content-type": "application/json"}};
});

router.add("POST", /^\/views\/(chapo|lackham)$/, async(server, part) => { // may have to include error
    const sectionId = part;
    server.views[sectionId] = ((server.views[sectionId]) || 0) + 1;
    return {body: JSON.stringify({click: server.views[sectionId]}),
    headers: {"Content-type": "application/json"}};
})

const port = 8000;
new MyServer({}).start(port);
console.log(`Listening on port ${port}`);
