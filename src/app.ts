class Carro {
    modelo: string;
    ano: number;
    velocidade: number
    parado: boolean;


    //o constructor é executado automaticamente quando criamos um novo objeto, a partir da classe.
    constructor(modelo: string, ano: number) {
        this.modelo = modelo;
        this.ano = ano;
        this.velocidade = 0;
        this.parado = true;
    }
    //quando um método não retorna nenhum valor, ele é void
    acelerar(): void {
        this.parado = false;
        this.velocidade += 10;
    }
    frear(): void {
        if (this.velocidade > 0) {
            this.velocidade -= 10
        }

        // static: métodos ou propriedades que não precisam ser instanciados para serem usados
        
    }
    static calcularIdadeCarro(ano: number):number{
           //new Date().getFullYear() coleta o ano atual
         return new Date().getFullYear()- ano;
        }
}
console.log(Carro.calcularIdadeCarro(2008))

//objeto sempre começa com letra maiúscula e sempre tem new (novo)
//instância da classe Carro - (instância é a representação da clase como um objeto.)
const palio = new Carro('Palio', 2008);
const GOL = new Carro('Gol', 1990);

console.log(palio.velocidade);
palio.frear();
console.log(palio.velocidade);
palio.frear();
console.log(palio.velocidade);
palio.frear();
console.log(palio.velocidade);
