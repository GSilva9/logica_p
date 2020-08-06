var prompt = require('prompt-sync')()

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./dados');


if (! localStorage.getItem('funcionarios.txt')){
    console.log('OBS:..Não há funcionarios cadastrados!')
    console.log()
    prompt('Pressione enter para continuar!!')  
    return
}

// lê o conteúdo de filmes.txt e atribui para lista
var lista = localStorage.getItem('funcionarios.txt')

//Separa o conteúdo de lista em elementos de vetor a cada ocorrência
var linhas = lista.split('\n')

//Se não existe um arquivo com o nome do filmes.txt
if (! localStorage.getItem('funcionarios.txt')){
    console.log('OBS:..Não há funcionarios cadastrados!')
    console.log()
    prompt('Pressione enter para continuar!!')   
    return
}

var pesq = "Diretor"

//Separa o conteúdo de lista em elementos de vetor a cada ocorrência
var linhas = lista.split('\n')

//Para Controlar se há filmes do gênero informado
var contador = 0

var num = 0 - 1

console.log(`\nNome do Funcionário..............: Cargo...............: Salário Nota`)

//Obtém cada linha do vetor linhas e atribui para linha
for(linha of linhas){
    //separa cada linha em elementos de vetor pela ocorrência do ';'
    var partes = linha.split(';')

    num++

    var nome = partes[0]
    var cargo = partes[1]
    var salario = partes[2]
    var nota = partes[3]

    if(cargo.toUpperCase() == pesq.toUpperCase()){        
        console.log(`${String(num).padStart(3,' ')} ${nome.padEnd(30,' ')} ${cargo.padEnd(20,' ')} ${salario.padStart(5,' ')} ${nota.padStart(5,' ')}`)
        contador++
    }
}

console.log()
var num_alt = Number(prompt('Qual número do funcionário que deve ter a nota alterada? '))

if (num_alt > num.length) {
    console.log('Número inválido')
    return
}

var nova_nota = Number(prompt(`Qual a nova nota do aluno ${linhas[num_alt-1].nome}? `))

linhas[num_alt-1].nota = nova_nota

var conteudo = ''

for (linha of linhas) {
    conteudo += linhas.nome + ';' + linhas.nota + '\n'
}

// substr para retirar a última \n
localStorage.setItem('funcionarios.txt', conteudo.substr(0, conteudo.length-1))

console.log('Ok! Nota do aluno alterada com sucesso')