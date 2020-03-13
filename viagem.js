var prompt = require('prompt-sync')()

var dias = Number(prompt("Dias de Viajem "))
var horas = Number(prompt("Horas de viagem "))

var total1 = (dias * 24)
var total2 = (total1 + horas)

console.log("Tempo total de viagem é de " + total2 + " horas")