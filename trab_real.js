var prompt = require('prompt-sync')()

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./dados');

while(true){
    titulo('Controle Pessoal de Filmes')
    console.log('1. Incluir Funcionário')
    console.log('2. Listar Funcionário')
    console.log('3. Pesquisar por Cargo')
    console.log('4. Excluir Funcionário')
    console.log('5. Projeção Reajuste')
    console.log('6. Estastísticas')
    console.log('7. Finalizar')
    var opcao = Number(prompt('Opção: '))
    if (opcao == 1){
        incluir()
    }else if (opcao == 2){
        listar()
    }else if (opcao == 3){
        pesquisar()
    }else if (opcao == 4){
        excluir()
    }else if(opcao == 5){
        projetar()
    }else if (opcao == 6){
        estatisticas()
    }else{
        break
    }

}

function titulo(mensa){
    console.log()
    console.log(mensa)
    console.log('================================')
}

function incluir(){
    titulo('Inclusão de Funcionários: ')
    var nome = prompt('Nome do Funcionário: ')
    var cargo = prompt('Cargo (Diretor, Analista de Sistemas, Estagiário): ')
    var salario = prompt('Salário R$: ')
    var nota = prompt('Nota (1 até 5): ')

    var lista = ''
    //Se existe um arquivo com o nome do filmes.txt
    if (localStorage.getItem('funcionarios.txt')){
        //Atribui os filmes na ordem com uma quebra de linha
        lista = localStorage.getItem('funcionarios.txt') + '\n'
    }

    localStorage.setItem('funcionarios.txt', lista + nome+';'+cargo+';'+salario+';'+nota)
    //localStorage.setItem('filmes.txt', lista + nome+';'+genero+';'+duracao+';'+nota)

    console.log(`FUNCIONÁRIO CADASTRADO COM SUCESSO`)

}

function listar() {
    titulo('Listagem de Funcionários')

    //Se não existe um arquivo com o nome do filmes.txt
    if (! localStorage.getItem('funcionarios.txt')){
       console.log('OBS:..Não há funcionarios cadastrados!')
       return
    }

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('funcionarios.txt')

    //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
    var linhas = lista.split('\n')

    console.log(`N: Nome do Funcionário..............: Cargo...............: Salário Nota`)

    var num = 0

    //Obtém cada linha do vetor linhas e atribui para linha
    for(linha of linhas){
        //separa cada linha em elementos de vetor pela ocorrência do ';'
        var partes = linha.split(';')

        num++

        var nome = partes[0]
        var cargo = partes[1]
        var salario = partes[2]
        var nota = partes[3]
        
        //converter número para uma string
        console.log(`${String(num).padStart(3,' ')} ${nome.padEnd(30,' ')} ${cargo.padEnd(20,' ')} ${salario.padStart(5,' ')} ${nota.padStart(5,' ')}`)
    }

}

function pesquisar(){
    titulo('Pesquisa de Filmes por Cargo')

    //Se não existe um arquivo com o nome do filmes.txt
    if (! localStorage.getItem('funcionarios.txt')){
       console.log('OBS:..Não há funcionarios cadastrados!')
       return
    }

    var pesq = prompt('Cargo: ')

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('funcionarios.txt')

    //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
    var linhas = lista.split('\n')

    //Para Controlar se há filmes do gênero informado
    var contador = 0

    console.log(`\nNome do Funcionário..............: Cargo...............: Salário Nota`)

    //Obtém cada linha do vetor linhas e atribui para linha
    for(linha of linhas){
        //separa cada linha em elementos de vetor pela ocorrência do ';'
        var partes = linha.split(';')

        var nome = partes[0]
        var cargo = partes[1]
        var salario = partes[2]
        var nota = partes[3]

        if(cargo.toUpperCase() == pesq.toUpperCase()){        
            console.log(`${nome.padEnd(30,' ')} ${cargo.padEnd(20,' ')} ${salario.padStart(5,' ')} ${nota.padStart(5,' ')}`)
            contador++
        }
    }

    if(contador == 0){
        console.log('Obs: Não há funcionários do cargo informado')
    }

}

function excluir(){
    listar()

    var num = Number(prompt('\nQual o número do Funcionário a ser excluido? (0 para retornar) '))

    if (num == 0){
        return
    }

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('funcionarios.txt')

    //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
    var linhas = lista.split('\n')

    //retorna o número de linha do veror
    var tam = linhas.length

    if(num > tam){
        console.log('Obs.: Número Incorreto')
        return
    }

    //remove do vetor a linha informada
    linhas.splice(num-1, 1)

    //Salva em localStorage o novo conteúdo do vetor linhas(sem a linha excluida)
    //.join('\n') acrcescenta uma quedra de linha ao final de cada elemento
    localStorage.setItem('funcionarios.txt', linhas.join('\n'))

    console.log('\nOk! FUNCIONÁRIO EXCLUIDO COM SUCESSO!')


}

function projetar() {      

    localStorage.removeItem('funcionarios_Reajuste.txt')

    //Aplicar a taxa de reajuste
    var taxa = prompt('Reajuste Salarial (%): ')

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('funcionarios.txt')

    //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
    var linhas = lista.split('\n')

    for(linha of linhas){
        //separa cada linha em elementos de vetor pela ocorrência do ';'
        var partes = linha.split(';')

        var nome = partes[0]
        var cargo = partes[1]
        var salario = Number(partes[2])
        var nota = partes[3]

        var reajustado = ((salario * taxa) / 100) + salario

        console.log(reajustado) 

        var lista = ''
        //Se existe um arquivo com o nome do filmes.txt
        if (localStorage.getItem('funcionarios_Reajuste.txt')){
        //Atribui os filmes na ordem com uma quebra de linha
        lista = localStorage.getItem('funcionarios_Reajuste.txt') + '\n'
        } 

        localStorage.setItem('funcionarios_Reajuste.txt', lista + nome+';'+cargo+';'+reajustado+';'+nota) 
                     
       
    }

    //========================== LISTAR NOVO DADO =============

    //Se não existe um arquivo com o nome do filmes.txt
    if (! localStorage.getItem('funcionarios_Reajuste.txt')){
        console.log('OBS:..Não há funcionarios cadastrados!')
        return
    }
      
    
    
  
    
}



function estatisticas() {
    titulo('Estatística do Cadastro de Funcionários')

    //Se não existe um arquivo com o nome do funcionarios.txt
    if (! localStorage.getItem('funcionarios.txt')){
       console.log('OBS:..Não há funcionários cadastrados!')
       return
    }

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('funcionarios.txt')

    //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
    var linhas = lista.split('\n')

    var tam = linhas.length
    var somaSalario = 0
    var somaNota = 0

    //Obtém cada linha do vetor linhas e atribui para linha
    for(linha of linhas){
        //separa cada linha em elementos de vetor pela ocorrência do ';'
        var partes = linha.split(';')

        var salarios = Number(partes[2])
        var nota = Number(partes[3])

        somaSalario = somaSalario + salarios
        somaNota += nota        
    }

    var mediasalario = somaSalario / tam
    var mediaNota = somaNota / tam

    console.log(`\nNúm FIlmes Cadastrados: ${tam}`)
    console.log(`\nDuração Média dos FIlmes Cadastrados: ${mediasalario.toFixed(1)}`)
    console.log(`\nNota Média dos FIlmes Cadastrados: ${mediaNota.toFixed(1)}`)

}

