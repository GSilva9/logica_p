var prompt = require('prompt-sync')()

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./dados');

console.clear()
console.log('\nALTERAÇÃO DE NOTAS DOS ESTAGIÁRIOS\n')

if (! localStorage.getItem('funcionarios.txt')){
    console.log()
    console.log('='.repeat(38))
    console.log('ERRO! Não há funcionarios cadastrados!')
    console.log('='.repeat(38))
    console.log()
    prompt('Pressione enter para continuar!!')  
    return
}

var contador = 0

var pesq = 'Estagiário'

var lista = localStorage.getItem('funcionarios.txt')

var linhas = lista.split('\n')

console.log(`N: Nome do Funcionário..........: Cargo.............: Salário   Nota`)

var num = 0

for(linha of linhas){
   var partes = linha.split(';')
   num++
   
   var nome = partes[0]
   var cargo = partes[1]
   var salario = partes[2]
   var nota = partes[3]

    if(cargo.toUpperCase() == pesq.toUpperCase()){      
       console.log(`${String(num)}:  ${nome.padEnd(30,' ')} ${cargo.padEnd(20,' ')} ${salario.padStart(5,' ')} ${nota.padStart(5,' ')}`)
       contador++
    }
}

var funcio = []

for (linha of linhas) {
    var partes = linha.split(';')
    funcio.push({nome: partes[0], cargo: partes[1], salario: partes[2], nota: Number(partes[3]) }) 
}

console.log()

var num_alt = Number(prompt('Qual número do Funcionário deve ter a nota alterada? '))

if (num_alt > funcio.length) {
    console.log('Número inválido')
    return
}

var nova_nota = Number(prompt(`Qual a nova nota do Funcionário ${funcio[num_alt-1].nome}? `))

funcio[num_alt-1].nota = nova_nota

var conteudo = ''
for(funciona of funcio){
    conteudo += funciona.nome + ';' + funciona.cargo + ';' + funciona.salario + ';' + funciona.nota + '\n'   
}

localStorage.setItem('funcionarios.txt', conteudo.substr(0, conteudo.length-1))

console.log('Nota Alterada com Sucesso!!!!')
console.log()
prompt('Pressione enter para sair!!')  