import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application()

const urls = JSON.parse(Deno.readTextFileSync('./urls.json'))
const router = new Router(); 
const books = new Map<string, any>(); 
books.set("1", {
    id: "1", 
    title: "The Hound of Baskerviller", 
    author: "Canon Doyle, Arthur"
}); 


router
.get("/", (context) => {
    context.response.body = "Hello world this is the landing page"
})
.get("/shrt", (context)=> {
    context.response.body = urls
})

.get("/shrt/:urlid", (context)=> {
    const urls = JSON.parse(Deno.readTextFileSync('./urls.json'))
    
    if(context.params && context.params.urlid && urls[context.params.urlid]){
        context.response.redirect(urls[context.params.urlid].dest);
    }else{
        context.response.body= "404";
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 });