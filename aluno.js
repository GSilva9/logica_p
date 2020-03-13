var prompt = require('prompt-sync')()

var aluno = prompt("Nome do aluno ")
var nota1 = Number(prompt("Nota 1 "))
var nota2 = Number(prompt("Nota 2 "))

var media = ((nota1 + nota2)/2)

console.log(`${aluno}, sua média é ${media} `)