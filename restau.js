var prompt = require('prompt-sync')()

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./dados');

while(true){
    titulo('Restaurantes na Cidade')
    console.log('1. Incluir Restaurantes')
    console.log('2. Listar Restaurantes')
    console.log('3. Pesquisar por Especialidade')
    console.log('4. Excluir Restaurantes')
    console.log('5. Estastísticas')
    console.log('6. Finalizar')
    var opcao = Number(prompt('Opção: '))
    if (opcao == 1){
        incluir()
    }else if (opcao == 2){
        listar()
    }else if (opcao == 3){
        pesquisar()
    }else if (opcao == 4){
        excluir()
    }else if (opcao == 5){
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
    titulo('Inclusão de Restaurantes: ')
    var nome = prompt('Título do Restaurante: ')
    var especialidade = prompt('Especialidade: ')
    var espera = prompt('Tempo de Espera (min): ')
    var nota = prompt('Nota (1 até 10): ')

    var lista = ''
    //Se existe um arquivo com o nome do filmes.txt
    if (localStorage.getItem('restaur.txt')){
        //Atribui os filmes na ordem com uma quebra de linha
        lista = localStorage.getItem('restaur.txt') + '\n'
    }

    localStorage.setItem('restaur.txt', lista + nome+';'+especialidade+';'+espera+';'+nota)

    console.log(`RESTAURANTE CADASTRADO COM SUCESSO`)

}

function listar() {
    titulo('Listagem de Restaurantes')

    //Se não existe um arquivo com o nome do filmes.txt
    if (! localStorage.getItem('restaur.txt')){
       console.log('OBS:..Não há Restaurantes cadastrados!')
       return
    }

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('restaur.txt')

    //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
    var linhas = lista.split('\n')

    console.log(`N: Nome do Restaurante..........: Especialidade............: Tempo de Espera Nota`)

    var num = 0

    //Obtém cada linha do vetor linhas e atribui para linha
    for(linha of linhas){
        //separa cada linha em elementos de vetor pela ocorrência do ';'
        var partes = linha.split(';')

        num++

        var nome = partes[0]
        var especialidade = partes[1]
        var espera = partes[2]
        var nota = partes[3]
        
        //converter número para uma string
        console.log(`${String(num).padStart(3,' ')} ${nome.padEnd(30,' ')} ${especialidade.padEnd(20,' ')} ${espera.padStart(5,' ')} ${nota.padStart(5,' ')}`)
    }

}

function pesquisar(){
    titulo('Pesquisa de Restaurantes por Especialidade')

    //Se não existe um arquivo com o nome do filmes.txt
    if (! localStorage.getItem('restaur.txt')){
       console.log('OBS:..Não há Restaurantes cadastrados!')
       return
    }

    var pesq = prompt('Especialidade: ')

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('restaur.txt')

    //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
    var linhas = lista.split('\n')

    //Para Controlar se há filmes do gênero informado
    var contador = 0

    console.log(`N: Nome do Restaurante..........: Especialidade............: Tempo de Espera Nota`)

    //Obtém cada linha do vetor linhas e atribui para linha
    for(linha of linhas){
        //separa cada linha em elementos de vetor pela ocorrência do ';'
        var partes = linha.split(';')

        var nome = partes[0]
        var especialidade = partes[1]
        var espera = partes[2]
        var nota = partes[3]

        if(especialidade.toUpperCase() == pesq.toUpperCase()){        
            console.log(`${nome.padEnd(30,' ')} ${especialidade.padEnd(20,' ')} ${espera.padStart(5,' ')} ${nota.padStart(5,' ')}`)
            contador++
        }
    }

    if(contador == 0){
        console.log('Obs: Não há Restaurantes do gênero informado')
    }

}

function excluir(){
    listar()

    var num = Number(prompt('\nQual o número do Restaurante a ser excluido? (0 para retornar) '))

    if (num == 0){
        return
    }

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('restaur.txt')

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
    localStorage.setItem('restaur.txt', linhas.join('\n'))

    console.log('\nOk! Restaurante removido com sucesso')


}

function estatisticas() {
    titulo('Estatística do Cadastro de Filmes')

    //Se não existe um arquivo com o nome do filmes.txt
    if (! localStorage.getItem('restaur.txt')){
       console.log('OBS:..Não há restaurantes cadastrados!')
       return
    }

    // lê o conteúdo de filmes.txt e atribui para lista
    var lista = localStorage.getItem('restaur.txt')

    //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
    var linhas = lista.split('\n')

    var tam = linhas.length
    var somaEspera = 0
    var somaNota = 0

    //Obtém cada linha do vetor linhas e atribui para linha
    for(linha of linhas){
        //separa cada linha em elementos de vetor pela ocorrência do ';'
        var partes = linha.split(';')

        var espera = Number(partes[2])
        var nota = Number(partes[3])

        somaEspera = somaEspera + espera
        somaNota += nota        
    }

    var mediaEspera = somaEspera / tam
    var mediaNota = somaNota / tam

    console.log(`\nNúm Restaurantes Cadastrados: ${tam}`)
    console.log(`\nTempo de espera Média dos Restaurantes Cadastrados: ${mediaEspera.toFixed(1)}`)
    console.log(`\nNota Média dos Restaurantes Cadastrados: ${mediaNota.toFixed(1)}`)


}

