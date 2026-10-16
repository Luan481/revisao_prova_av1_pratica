import { Request, Response, Router } from "express";
import { camaService } from "../services/camas.service.js";
import { Cama, CriarCama } from "../types/cama.js";

export const camaRouter = Router()

camaRouter.get("/", async (_request: Request, response: Response) => {
    try {

        const camas = await camaService.getAll()

        return response.json(camas)

    }

    catch (error) {
        console.error(error);

        return response.status(500).json({
            message: "Erro ao buscar camas",
        });
    }
})

camaRouter.get("/:id", async (request: Request<{ id: String }>, response: Response) => {
    try {
        const id = request.params.id
        

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const cama = await camaService.getById(id)

        return response.json(cama)

    }

    catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Cama não encontrada",
        });
    }
})

camaRouter.post("/", async (_request: Request<{}, {}, CriarCama>, response: Response) => {
    try {
        const dados = _request.body

        const cama = await camaService.create(dados)

        return response.status(201).json(cama);

    }

    catch (error) {
        console.error(error);

        return response.status(500).json({
            message: "Erro ao criar cama",
        });
    }
})

camaRouter.put("/:id", async (_request: Request<{ id: string }, {}, CriarCama>, response: Response) => {
    try {
        const id = _request.params.id


        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const dados = _request.body

        const cama = await camaService.update(id, dados)

        return response.json(cama)
    }

    catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Cama não encontrada",
        });
    }
})

camaRouter.delete("/:id", async (request: Request<{ id: String }>, response: Response) => {
    try {
        const id = request.params.id
        

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const cama = await camaService.delete(id)

        return response.json({
            message: "Cama deletada com sucesso!",
            cama: cama
        })

    }

    catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Cama não encontrada",
        });
    }
})