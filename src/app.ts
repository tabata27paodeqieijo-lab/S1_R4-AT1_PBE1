import express from "express";
import type { Express, Request, Response } from "express";
import fs from "fs";

const app: Express = express();
const PORT: number = 4041;

const DIR = "./dados";
const FILE = `${DIR}/cadastros.json`;

if (!fs.existsSync(FILE)) {
fs.mkdirSync(DIR, { recursive: true });

fs.writeFileSync(FILE, `[]`, "utf-8");

}

app.use(express.json());

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

app.listen(PORT, () => {
console.log(`Servidor rodando em <http://localhost>:${PORT}`);
});