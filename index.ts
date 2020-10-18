import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application()
const books = new Map<string, any>(); 
books.set("1", {
    id: "1", 
    title: "The Hound of Baskerviller", 
    author: "Canon Doyle, Arthur"
}); 

const router = new Router(); 

router
.get("/", (context) => {
    context.response.body = "Hello world this is the landing page"
})
.get("/book/:id", (context)=> {
    if(context.params && context.params.id && books.has(context.params.id)){
        context.response.body = books.get(context.params.id)
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 });