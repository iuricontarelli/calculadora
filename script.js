"use strict"; // Habilita o modo estrito do JavaScript para garantir boas práticas de codificação.

// Elementos DOM
const display = document.getElementById("display"); // Elemento de exibição da calculadora
const numeros = document.querySelectorAll("[id*=tecla]"); // Seleciona todos os elementos com ID contendo "tecla"
const operadores = document.querySelectorAll("[id*=operador]"); // Seleciona todos os elementos com ID contendo "operador"

// Variáveis de estado
let novoNumero = true; // Indica se o próximo número a ser inserido é novo
let operador; // Armazena o operador selecionado
let numeroAnterior; // Armazena o número anterior antes de selecionar um operador

// Verifica se há uma operação pendente
const operacaoPendente = () => operador !== undefined;

// Função para calcular o resultado da operação pendente
const calcular = () => {
	if (operacaoPendente()) {
		// Verifica se há uma operação pendente
		const numeroAtual = parseFloat(
			display.textContent.replace(".", "").replace(",", ".")
		); // Obtém o número atual do display
		novoNumero = true; // Define que o próximo número a ser inserido será novo
		// Calcula o resultado da operação pendente e atualiza o display
		const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
		atualizarDisplay(resultado);
	}
};

// Função para atualizar o conteúdo do display
const atualizarDisplay = (texto) => {
	if (novoNumero) {
		display.textContent = texto.toLocaleString("BR"); // Define o novo texto no display
		novoNumero = false;
	} else {
		display.textContent += texto.toLocaleString("BR"); // Adiciona o texto ao display
	}
	document.querySelector("#igual").focus(); // Define o foco no botão de igual
};

// Função para inserir um número no display
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));

// Função para selecionar um operador
const selecionarOperador = (evento) => {
	if (!novoNumero) {
		// Verifica se não é um novo número
		calcular(); // Calcula a operação pendente
		novoNumero = true; // Define que o próximo número será novo
		operador = evento.target.textContent; // Armazena o operador selecionado
		numeroAnterior = parseFloat(
			display.textContent.replace(".", "").replace(",", ".")
		); // Armazena o número anterior
	}
};
operadores.forEach((operador) =>
	operador.addEventListener("click", selecionarOperador)
);

// Função para ativar o botão de igual
const ativarIgual = () => {
	calcular(); // Calcula a operação pendente
	operador = undefined; // Limpa o operador
};
document.getElementById("igual").addEventListener("click", ativarIgual);

// Função para limpar o display
const limparDisplay = () => (display.textContent = "");
document
	.getElementById("limparDisplay")
	.addEventListener("click", limparDisplay);

// Função para limpar toda a calculadora
const limparCalculo = () => {
	limparDisplay(); // Limpa o display
	operador = undefined; // Limpa o operador
	novoNumero = true; // Define que o próximo número será novo
	numeroAnterior = undefined; // Limpa o número anterior
};
document
	.getElementById("limparCalculo")
	.addEventListener("click", limparCalculo);

// Função para remover o último número do display
const removerUltimoNumero = () =>
	(display.textContent = display.textContent.slice(0, -1));
document
	.getElementById("backspace")
	.addEventListener("click", removerUltimoNumero);

// Função para inverter o sinal do número no display
const inverterSinal = () => {
	novoNumero = true; // Define que o próximo número será novo
	atualizarDisplay(display.textContent * -1); // Inverte o sinal do número
};
document.getElementById("inverter").addEventListener("click", inverterSinal);

// Verifica se já existe uma vírgula no número atual
const existeDecimal = () => display.textContent.indexOf(",") !== -1;

// Verifica se há algum valor no display
const existeValor = () => display.textContent.length > 0;

// Função para inserir uma vírgula no número atual
const inserirDecimal = () => {
	if (!existeDecimal()) {
		// Verifica se não há vírgula
		if (novoNumero) {
			atualizarDisplay("0,"); // Adiciona "0," se for um novo número
		} else {
			atualizarDisplay(","); // Adiciona "," se não for um novo número
		}
	}
};
document.getElementById("decimal").addEventListener("click", inserirDecimal);

// Mapeamento de teclas para as operações da calculadora
const mapaTeclado = {
	0: "tecla0",
	1: "tecla1",
	2: "tecla2",
	3: "tecla3",
	4: "tecla4",
	5: "tecla5",
	6: "tecla6",
	7: "tecla7",
	8: "tecla8",
	9: "tecla9",
	"/": "operadorDividir",
	"*": "operadorMultiplicar",
	"-": "operadorSubtrair",
	"+": "operadorAdicionar",
	"=": "igual",
	Enter: "igual",
	Backspace: "backspace",
	c: "limparDisplay",
	Escape: "limparCalculo",
	",": "decimal",
};

// Função para mapear as teclas do teclado para as operações da calculadora
const mapearTeclado = (evento) => {
	const tecla = evento.key; // Obtém a tecla pressionada
	const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1; // Verifica se a tecla é permitida
	if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click(); // Simula o clique no botão correspondente à tecla
};
document.addEventListener("keydown", mapearTeclado); // Adiciona um ouvinte de evento para mapear as teclas do teclado
