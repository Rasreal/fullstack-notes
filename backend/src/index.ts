import express from "express";
import cors from "cors";
import {PrismaClient} from "@prisma/client";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());


app.get("/api/notes", async (req: express.Request, res: express.Response) => {
    try {
        const notes = await prisma.note.findMany();
        res.json(notes);  //
    } catch (error) {
        console.error("❌ Error fetching notes:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
});



app.post("/api/notes", async (req: express.Request, res: express.Response):Promise<any> => {

    const {title, content} = req.body;


    if(!title || !content){
       return res.status(400).send("Atayu nemese Jazbasy zhoq!")
    }

    try{
        const note = await prisma.note.create({
            data: {
                title,
                content,
            }
        });
        return res.json(note);
    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }


});

app.put("/api/notes/:id", async (req: express.Request, res: express.Response):Promise<any> => {

    const {title, content} = req.body;
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)){
        return res.status(400).send("ID zhoq nemese San bolu kerek!")
    }

    try{
        const updNote = await prisma.note.update({
            where: {id},
            data: {
                title,
                content,
            }
        });
        return res.json(updNote);
    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }


});


app.delete("/api/notes/:id", async (req: express.Request, res: express.Response):Promise<any> => {
    const id= parseInt(req.params.id);


    if(!id || isNaN(id)){
        return res.status(400).send("ID zhoq nemese San bolu kerek!")
    }

    try {
        await prisma.note.delete({
            where: {id},
        })

        return res.status(204).send({message: "Successfully deleted"})
    } catch (error: any) {
        return res.status(500).json({message: error.message});
    }
})


app.listen(5001, () => {
    console.log("Server running on port 5001...");
})




