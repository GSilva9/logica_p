var prompt = require('prompt-sync')()

var valor = Number(prompt("Valor total da conta R$ "))
var cliente = Number(prompt("Número total de clientes "))

var total = (valor/cliente)

console.log(`Valor por cliente R$ ${total}`)