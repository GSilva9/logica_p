var prompt = require('prompt-sync')()

var produto = prompt("Produto ")
var valor = Number(prompt("Valor do produto R$ ")) 

var desconto = (valor * 0.90)
var vezes = (valor/3)

console.log("Produto " + produto)
console.log("Preço " + valor)
console.log( "-----------------------" )
console.log("Opções de Pagamento " )
console.log("Valor à Vista R$ " + desconto)
console.log("ou em 3x de R$ " + vezes.toFixed(2)) //.toFixed(2) número de casas decimais
