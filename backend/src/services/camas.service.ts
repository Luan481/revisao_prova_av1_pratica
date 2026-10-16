import pool from "../database/connection.js";
import { Cama, CriarCama } from "../types/cama.js";

class CamaService {

    //GET
    async getAll(): Promise<Cama[]> {
        try {
            const res = await pool.query<Cama>(`SELECT * FROM camas`)

            return res.rows
        }
        catch (error) {
            console.error('Nenhuma cama encontrada', error)
            throw new Error('Erro no banco de dados')
        }
    }

    //POST
    async create(dados: CriarCama): Promise<Cama> {
        try {
            const res = await pool.query<Cama>(`INSERT INTO camas(preco, ativo, descricao) VALUES ($1,$2,$3) RETURNING *`, [dados.preco, dados.ativo, dados.descricao])

            const cama = res.rows[0]

            if (!cama) {
                throw new Error('O banco não retornou nenhuma cama cadastrada')
            }

            return cama
        }
        catch (error) {
            console.error('Erro ao criar cama', error)
            throw new Error('Erro no banco de dados')

        }

    }

    //GET:id
    async getById(id: String): Promise<Cama> {

        try {
            const res = await pool.query<Cama>(`SELECT * FROM camas WHERE id = $1`, [id])

            console.log(res.rows[0])

            const cama = res.rows[0]

            if (!cama) {
                throw new Error('O banco não retornou nenhuma cama')
            }

            return cama
        }
        catch (error) {
            console.error('Nenhuma cama encontrada')
            throw new Error('Erro no banco de dados')
        }
    }

    //PUT
    async update(id: string, dados: CriarCama): Promise<Cama> {
        try {
            const res = await pool.query<Cama>(`UPDATE camas SET preco = $1, ativo = $2, descricao = $3 WHERE id = $4 RETURNING *`, [dados.preco, dados.ativo, dados.descricao, id])

            const cama = res.rows[0]
            if (!cama) {
                throw new Error('O banco não retornou nenhuma cama')
            }
            return cama
        }
        catch (error) {
            console.error('Cama não encontrada')
            throw new Error('Erro no banco de dados')

        }
    }

    //DELETE
    async delete(id: String): Promise<Cama> {

        try {
            const res = await pool.query<Cama>(`DELETE FROM camas WHERE id = $1 RETURNING *`, [id])

            console.log(res)

            const cama = res.rows[0]

            if (!cama) {
                throw new Error('O banco não retornou nenhuma cama')
            }

            return cama
        }
        catch (error) {
            console.error('Nenhuma cama encontrada')
            throw new Error('Erro no banco de dados')
        }
    }
}
export const camaService = new CamaService