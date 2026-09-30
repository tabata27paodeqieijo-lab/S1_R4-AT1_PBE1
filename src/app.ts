import express from "express";
import type { Express, Request, Response } from "express";
import fs from "fs";
import { z } from "zod"

const app: Express = express();
const PORT: number = 4041;

const DIR = "./dados";
const FILE = `${DIR}/cadastros.json`;

if (!fs.existsSync(FILE)) {
    fs.mkdirSync(DIR, { recursive: true });

    fs.writeFileSync(FILE, `[]`, "utf-8");

}

app.use(express.json());
app.use(express.json());

const createChamadosSchema = z.object({
    nomeCliente: z.string().min(20),
    descricaoProblema: z.string().min(15),
    prioridade: z.enum(["Baixa", "Média", "Alta"]),
    statusCadastro: z.enum(["Aberto", "Em Atendimento", "Concluído"])
});

type Chamado = {
    id: string,
    nomeCliente: string,
    descricaoProblema: string,
    prioridade: "Baixa" | "Média" | "Alta",
    status: "Aberto" | "Em Atendimento" | "Concluído"
}

app.get("/cadastros", (req: Request, res: Response) => {
    try {

        const data: string = fs.readFileSync(FILE, "utf-8");
        const cadastros: Chamado[] = JSON.parse(data);

        res.status(200).json(cadastros);

    } catch (error) {

        console.error("erro ao buscar os cadastros:", error);

        res.status(500).json({
            erro: "erro interno no servidor ao buscar os cadastros!"
        });

    }

});

app.post("/cadastros", (req: Request, res: Response) => {
    try {

        const { nomeCliente, descricaoProblema, prioridade, statusCadastro } = createChamadosSchema.parse(req.body);

        const data: string = fs.readFileSync(FILE, "utf-8");
        let cadastros: Chamado[] = JSON.parse(data);

        const novoCadastro: Chamado = {
            id: crypto.randomUUID(),
            nomeCliente: nomeCliente,
            descricaoProblema: descricaoProblema,
            prioridade: prioridade,
            status: statusCadastro
        }

        cadastros.push(novoCadastro);

        fs.writeFileSync(FILE, JSON.stringify(cadastros, null, 4), "utf-8");

        res.status(201).json({
            message: `Cadastro ${nomeCliente} - ${descricaoProblema} - ${prioridade} - ${statusCadastro} Cadastro foi criado com sucesso!`,
            Cadastro: novoCadastro
        });

    } catch (error) {

        if (error instanceof z.ZodError) {
            return res.status(400).json({
                erro: "os parâmetros enviados são inválidos"
            })
        }

        console.error("Erro ao salvar o Cadastro:", error);
        res.status(500).json({
            erro: "Erro interno no servidor ao cadastrar Cadastro"
        });

    }

});

app.listen(PORT, () => {
    console.log(`Servidor rodando em <http://localhost>:${PORT}`);
});