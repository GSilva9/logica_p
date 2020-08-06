var prompt = require('prompt-sync')()

//Define o armazenamento
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./dados');

while(true){
    console.clear()
    titulo('Controle de Funcionários')
    console.log('1. Incluir Funcionário')
    console.log('2. Menu de Listagem de Funcionários')
    console.log('3. Pesquisar por Cargo')
    console.log('4. Menu de Exlusão')
    console.log('5. Menu de Reajuste Salarial')
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

//Função dos ==
function titulo(mensa){
    console.log()
    console.log(mensa)
    console.log('='.repeat(38))
   
}

//Inclusão dos funcionários
function incluir(){
    titulo('Inclusão de Funcionários: ')

    var nome = prompt('Nome do Funcionário: ')
    var cargo = prompt('Cargo (Diretor, Analista de Sistemas, Estagiário): ')
    var salario = prompt('Salário R$: ')
    var nota = 3.5 //Nota para todo funcionário que entrar na Empresa será de 3.5

    var lista = ''
    //Se existe um arquivo com o nome do funcionarios.txt
    if (localStorage.getItem('funcionarios.txt')){
        //Atribui os funcionarios na ordem com uma quebra de linha
        lista = localStorage.getItem('funcionarios.txt') + '\n'
    }

    localStorage.setItem('funcionarios.txt', lista + nome+';'+cargo+';'+salario+';'+nota)
   
    console.log()
    console.log(`FUNCIONÁRIO CADASTRADO COM SUCESSO`)
    console.log()
    prompt('Pressione enter para continuar!!')
}

//Menu de listagem dos Funcionários
function listar() {    
    titulo('Menu de listagem dos Funcionários')

    //Se não existe um arquivo com o nome do funcionarios.txt
    if (! localStorage.getItem('funcionarios.txt')){
       console.log('ERRO! Não há funcionarios cadastrados!')
       console.log('='.repeat(38))
       console.log()
       prompt('Pressione enter para continuar!!')  
       return
    }

    while(true){
        console.clear()
        titulo('Listagem de Funcionários')
        console.log('1. Listar por Ordem Alfabética')
        console.log('2. Listar por Salário')
        console.log('3. Listar por Nota')        
        console.log('4. Voltar')
        var opcao = Number(prompt('Opção: '))
        if (opcao == 1){
            listaOrdem()
        }else if (opcao == 2){
            listaSalario()
        }else if (opcao == 3){
            listaNota()
        }else{
            break
        }
    }

    function listaOrdem(){

        // lê o conteúdo de funcionarios.txt e atribui para lista
        var lista = localStorage.getItem('funcionarios.txt')

        //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
        var linhas = lista.split('\n')
        
        // declara o vetor funcionarios
        var funcio = []

        // obtém cada linha do vetor linhas
        for (linha of linhas) {
            var partes = linha.split(';')
                
            // inclui estes dados no vetor funcionarios
            funcio.push({nome: partes[0], cargo: partes[1], salario: partes[2], nota: Number(partes[3]) }) 
        }

        // ordena os funcionarios por nome
        funcio.sort(function (a, b) {return a.nome > b.nome ? 1 : -1})

        console.log(`Nome do Funcionário..............: Cargo...............: Salário Nota`)
        console.log()

        
        for(funciona of funcio){
            //separa cada linha em elementos de vetor pela ocorrência do ';'            
            console.log(`${funciona.nome.padEnd(30, ' ')} ${funciona.cargo.padEnd(20,' ')} ${funciona.salario.padStart(5,' ')} ${funciona.nota.toFixed(1)}`)        
        }

        console.log()
        prompt('Pressione enter para continuar!!')   

    }

    function listaSalario(){
        var lista = localStorage.getItem('funcionarios.txt')

        var linhas = lista.split('\n')
        
        var funcio = []

        for (linha of linhas) {
            var partes = linha.split(';')

            funcio.push({nome: partes[0], cargo: partes[1], salario: Number(partes[2]), nota: Number(partes[3]) }) 
        }

        funcio.sort(function (a, b) {return b.salario - a.salario})

        console.log(`Nome do Funcionário..............: Cargo...............: Salário Nota`)
        console.log()
        
        for(funciona of funcio){           
            console.log(`${funciona.nome.padEnd(30, ' ')} ${funciona.cargo.padEnd(20,' ')} ${funciona.salario.toFixed(2)}      ${funciona.nota.toFixed(1)}`)        
        }

        console.log()
        prompt('Pressione enter para continuar!!')   
    }

    function listaNota(){
        var lista = localStorage.getItem('funcionarios.txt')

        var linhas = lista.split('\n')
        
        var funcio = []
       
        for (linha of linhas) {
            var partes = linha.split(';')

            funcio.push({nome: partes[0], cargo: partes[1], salario: partes[2], nota: Number(partes[3]) }) 
        }
 
        funcio.sort(function (a, b) {return b.nota - a.nota})
 
        console.log(`Nome do Funcionário..............: Cargo...............: Salário Nota`)
        console.log()
 
         
        for(funciona of funcio){             
            console.log(`${funciona.nome.padEnd(30, ' ')} ${funciona.cargo.padEnd(20,' ')} ${funciona.salario} ${funciona.nota.toFixed(1)}`)        
        }
 
        console.log()
        prompt('Pressione enter para continuar!!') 
    }  
}

//Pesquisar Funcionários por cargo
function pesquisar(){
    titulo('Pesquisa de Funcionários por Cargo')

    //Se não existe um arquivo com o nome do filmes.txt
    if (! localStorage.getItem('funcionarios.txt')){
       console.log('ERRO! Não há funcionarios cadastrados!')
       console.log('='.repeat(38))
       console.log()
       prompt('Pressione enter para continuar!!')   
       return
    }

    var pesq = prompt('Cargo: ')

    var lista = localStorage.getItem('funcionarios.txt')

    var linhas = lista.split('\n')

    //Para Controlar se há funcionarios do cargo informado
    var contador = 0

    console.log(`\nNome do Funcionário..............: Cargo...............: Salário Nota`)

    for(linha of linhas){
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

    console.log()
    prompt('Pressione enter para continuar!!')  
}

//Menu de exclusão
function excluir(){
    titulo('Menu Exclusão de Funcionários')
    
    if (! localStorage.getItem('funcionarios.txt')){
        console.log('ERRO! Não há funcionarios cadastrados!')
        console.log('='.repeat(38))
        console.log()
        prompt('Pressione enter para continuar!!')  
        return
    }

    while(true){
        console.clear()
        titulo('Menu de Exclusão')
        console.log('1. Excluir Funcionário')
        console.log('2. Excluir Folha Salarial Reajustada')
        console.log('3. Excluir Empresa')        
        console.log('4. Voltar')
        var opcao = Number(prompt('Opção: '))
        if (opcao == 1){
            excluirFunci()
        }else if (opcao == 2){
            excluirReajuste()
        }else if (opcao == 3){
            excluirEmpresa()
        }else{
            break
        }
    }

    //função para listar
    function listagem(){
        if (! localStorage.getItem('funcionarios.txt')){
            console.log('OBS:..Não há funcionarios cadastrados!')
            console.log()
            prompt('Pressione enter para continuar!!')  
            return
        }
     
        // lê o conteúdo de funcionarios.txt e atribui para lista
        var lista = localStorage.getItem('funcionarios.txt')
     
        //Separa o conteúdo de lista em elementos de vetor a cada ocorrência
        var linhas = lista.split('\n')
     
        console.log(`N: Nome do Funcionário............: Cargo.............: Salário   Nota`)
     
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
            
            console.log(`${String(num).padStart(3,' ')} ${nome.padEnd(30,' ')} ${cargo.padEnd(20,' ')} ${salario.padStart(5,' ')} ${nota.padStart(5,' ')}`)
        }
     
    }

    function excluirFunci(){
        listagem()
        var num = Number(prompt('\nQual o número do Funcionário a ser excluido? (0 para retornar) '))

        if (num == 0){
            return
        }
        
        var lista = localStorage.getItem('funcionarios.txt')

        var linhas = lista.split('\n')

        var tam = linhas.length

        if(num > tam){
            console.log('Obs.: Número Incorreto')
            console.log()
            prompt('Pressione enter para continuar!!')  
            return
        }

        //remove do vetor a linha informada
        linhas.splice(num-1, 1)

        localStorage.setItem('funcionarios.txt', linhas.join('\n'))

        console.log()
        console.log('OK! FUNCIONÁRIO EXCLUIDO COM SUCESSO!')
        console.log()
        prompt('Pressione enter para continuar!!')  
    }

    function excluirReajuste(){

        if (! localStorage.getItem('funcionarios_Reajuste.txt')){
            console.log('OBS:..Não há salarios reajustados!')
            console.log()
            prompt('Pressione enter para continuar!!')  
            return
        }else{
            localStorage.removeItem('funcionarios_Reajuste.txt')
            console.log('FOLHA EXCLUIDA COM SUCESSO!!')
            console.log()
            prompt('Pressione enter para continuar!!')     
        }                 
    }

    function excluirEmpresa(){

        while(true){
            console.clear()
            titulo('Certeza de excluir todos os dados cadastrados? ')
            console.log('1. Sim')        
            console.log('2. Não (Voltar)')
            var opcao = Number(prompt('Opção: '))
            if (opcao == 1){
                limpatudo()
                break   
            }else{
                break
            }
        }

        function limpatudo(){
            localStorage.clear()
            console.log('==============================')            
            console.log('EMPRESA EXCLUIDA COM SUCESSO!!')
            console.log()
            prompt('Pressione enter para continuar!!')  
        }   
    }   
}

//Menu da projeção Salarial
function projetar() {  
    titulo('Menu Reajuste Salarial de Funcionários')

    //Se não existe um arquivo com o nome do funcionarios.txt
    if (! localStorage.getItem('funcionarios.txt')){
        console.log('ERRO! Não há funcionarios cadastrados!!')
        console.log('='.repeat(38))
        console.log()
        prompt('Pressione enter para continuar!!')  
        return
    }

    while(true){
        console.clear()
        titulo('REAJUSTE SALARIAL')
        console.log('1. Reajuste por Cargo')
        console.log('2. Reajuste por Salário')
        console.log('3. Reajuste por Nota')
        console.log('4. Voltar')
        var opcao = Number(prompt('Opção: '))
        if (opcao == 1){
            porCargo()
        }else if (opcao == 2){
            porSalario()
        }else if (opcao == 3){
            porNota()
        }else{
            break
        }
    
    }

    function porCargo(){

        //Remove o localStorage funcionarios_Reajuste caso já tenha feito o reajusto por outra categoria
        localStorage.removeItem('funcionarios_Reajuste.txt')

        var pesq = prompt('Cargo: ')

        var lista = localStorage.getItem('funcionarios.txt')

        var linhas = lista.split('\n')

        var contador = 0
        var taxa = prompt('Reajuste Salarial (%): ') 
        
        console.log()
        console.log(`N: Nome do Funcionário..............: Cargo...............: Salário Reajustado Nota`)
        
        for(linha of linhas){
            
            var partes = linha.split(';')
    
            var nome = partes[0]
            var cargo = partes[1]
            var salario = partes[2]
            var nota = partes[3]
    
            if(cargo.toUpperCase() == pesq.toUpperCase()){
                console.log(`${nome.padEnd(30,' ')} ${cargo.padEnd(20,' ')} ${salario.padStart(5,' ')} ${nota.padStart(5,' ')}`)
                         
                contador++              
                
                var reajustado = ((Number(salario) * taxa) / 100) + Number(salario)                

                var lista = ''                
                if (localStorage.getItem('funcionarios_Reajuste.txt')){                    
                    lista = localStorage.getItem('funcionarios_Reajuste.txt') + '\n'
                } 

                localStorage.setItem('funcionarios_Reajuste.txt', lista + nome+';'+cargo+';'+reajustado+';'+nota)           
            }           
        }        
        
        if(contador == 0){
            console.log('Obs: Não há funcionários do cargo informado')
            console.log()
            prompt('Pressione enter para continuar!!')  
        }else{
            // lê o conteúdo de funcionarios_Reajuste.txt e atribui para lista
            var lista = localStorage.getItem('funcionarios_Reajuste.txt')

            var linhas = lista.split('\n')

            console.log()
            console.log(` ======== NOVA FOLHA DE PAGAMENTO ===========`)
            console.log()
            console.log(`N: Nome do Funcionário..............: Cargo...............: Salário Reajustado Nota`)
            
            var num = 0

            for(linha of linhas){
                var partes = linha.split(';')
                num++
                var nome = partes[0]
                var cargo = partes[1]
                var reajustado = partes[2]
                var nota = partes[3]
            
                console.log(`${String(num).padStart(1,' ')} ${nome.padEnd(35,' ')} ${cargo.padEnd(25,' ')} ${reajustado.padStart(10,' ')} ${nota.padStart(5,' ')}`)
            } 
        }
        console.log()
        prompt('Pressione enter para continuar!!')  
    }

    function porSalario(){

        localStorage.removeItem('funcionarios_Reajuste.txt')

        var pesq = prompt('Salário: ')

        var lista = localStorage.getItem('funcionarios.txt')

        var linhas = lista.split('\n')

        var contador = 0
        var taxa = prompt('Reajuste Salarial (%): ') 

        console.log()
        console.log(`N: Nome do Funcionário..............: Cargo...............: Salário Reajustado Nota`)

        for(linha of linhas){
            
            var partes = linha.split(';')
    
            var nome = partes[0]
            var cargo = partes[1]
            var salario = partes[2]
            var nota = partes[3]
    
            if(salario.toUpperCase() >= pesq.toUpperCase()){
                console.log(`${nome.padEnd(30,' ')} ${cargo.padEnd(20,' ')} ${salario.padStart(5,' ')} ${nota.padStart(5,' ')}`)
                         
                contador++              
                
                var reajustado = ((Number(salario) * taxa) / 100) + Number(salario)

                var lista = ''                
                if (localStorage.getItem('funcionarios_Reajuste.txt')){
                    //Atribui os filmes na ordem com uma quebra de linha
                    lista = localStorage.getItem('funcionarios_Reajuste.txt') + '\n'
                } 

                localStorage.setItem('funcionarios_Reajuste.txt', lista + nome+';'+cargo+';'+reajustado+';'+nota)            
            }
            
        }if(contador == 0){
            console.log('Obs: Não há funcionários com o salário informado')
        }else{
            var lista = localStorage.getItem('funcionarios_Reajuste.txt')

            var linhas = lista.split('\n')

            console.log()
            console.log(` ======== NOVA FOLHA DE PAGAMENTO ===========`)
            console.log()
            console.log(`N: Nome do Funcionário..............: Cargo...............: Salário Reajustado Nota`)
            
            var num = 0
            for(linha of linhas){
                var partes = linha.split(';')
                num++
                var nome = partes[0]
                var cargo = partes[1]
                var reajustado = partes[2]
                var nota = partes[3]

                console.log(`${String(num).padStart(1,' ')} ${nome.padEnd(35,' ')} ${cargo.padEnd(25,' ')} ${reajustado.padStart(10,' ')} ${nota.padStart(5,' ')}`)     
            } 
        }      
        console.log()
        prompt('Pressione enter para continuar!!')  
    }

    function porNota (){

        localStorage.removeItem('funcionarios_Reajuste.txt')

        var pesq = prompt('Nota: ')

        var lista = localStorage.getItem('funcionarios.txt')

        var linhas = lista.split('\n')

        var contador = 0
        var taxa = prompt('Reajuste Salarial (%): ') 

        console.log(`\nNome do Funcionário..............: Cargo...............: Salário Nota`)
        console.log()

        for(linha of linhas){
            
            var partes = linha.split(';')
    
            var nome = partes[0]
            var cargo = partes[1]
            var salario = partes[2]
            var nota = partes[3]
    
            if(nota.toUpperCase() >= pesq.toUpperCase()){
                console.log(`${nome.padEnd(30,' ')} ${cargo.padEnd(20,' ')} ${salario.padStart(5,' ')} ${nota.padStart(5,' ')}`)
                         
                contador++               
                var reajustado = ((Number(salario) * taxa) / 100) + Number(salario)
                
                var lista = ''
                
                if (localStorage.getItem('funcionarios_Reajuste.txt')){                    
                    lista = localStorage.getItem('funcionarios_Reajuste.txt') + '\n'
                } 

                localStorage.setItem('funcionarios_Reajuste.txt', lista + nome+';'+cargo+';'+reajustado+';'+nota)                                 
                
            }
        }if(contador == 0){
            console.log('Obs: Não há funcionários com a nota informada')
            console.log()
            prompt('Pressione enter para continuar!!')  
        }else{            
            var lista = localStorage.getItem('funcionarios_Reajuste.txt')
            
            var linhas = lista.split('\n')

            console.log()
            console.log(` ======== NOVA FOLHA DE PAGAMENTO ===========`)
            console.log()
            console.log(`N: Nome do Funcionário............: Cargo.............: Salário Reajustado Nota`)
            
            var num = 0

            for(linha of linhas){
                var partes = linha.split(';')
                num++
                var nome = partes[0]
                var cargo = partes[1]
                var reajustado = partes[2]
                var nota = partes[3]

                console.log(`${String(num).padStart(1,' ')} ${nome.padEnd(35,' ')} ${cargo.padEnd(25,' ')} ${reajustado.padStart(10,' ')} ${nota.padStart(5,' ')}`)      
            }
        }
        console.log()
        prompt('Pressione enter para continuar!!')  
    }         
}

//Estatisticas 
function estatisticas() {
    titulo('Estatística do Cadastro de Funcionários')

    //Se não existe um arquivo com o nome do funcionarios.txt
    if (! localStorage.getItem('funcionarios.txt')){
        console.log('ERRO! Não há funcionarios cadastrados!')
        console.log('='.repeat(38))
        console.log()
        prompt('Pressione enter para continuar!!')  
        return
    }else{
        var lista = localStorage.getItem('funcionarios.txt')
 
        var linhas = lista.split('\n')
 
        var tam = linhas.length
        var somaSalario = 0
        var somaNota = 0
 
        for(linha of linhas){
            var partes = linha.split(';')
            var salarios = Number(partes[2])
            var nota = Number(partes[3])
 
            somaSalario = somaSalario + salarios
            somaNota += nota        
        }
 
        var mediasalario = somaSalario / tam
        var mediaNota = somaNota / tam
 
        console.log(`\nNúmero de Funcionários: ${tam}`)
        console.log(`\nMédia Salarial dos Funcionarios: ${mediasalario.toFixed(1)}`)
        console.log(`\nNota Média dos Média dos Funcionarios: ${mediaNota.toFixed(1)}`)
 
    }

    if (! localStorage.getItem('funcionarios_Reajuste.txt')){
        console.log('\n====== REAJUSTE PROXIMO ANO ========')
        console.log('OBS:..Não há Reajuste Salarial!')
        console.log()
        prompt('Pressione enter para continuar!!')  
        return
     }else{
        var lista = localStorage.getItem('funcionarios_Reajuste.txt')
        var linhas = lista.split('\n')

        var tam = linhas.length

        var somaReajus = 0
        var somaNota = 0
 
        for(linha of linhas){
            var partes = linha.split(';')
 
            var reajustado = Number(partes[2])
            var nota = Number(partes[3])
 
            somaReajus = somaReajus + reajustado
            somaNota += nota        
        }
 
        var mediareajus = somaReajus / tam
       
        console.log('\n====== REAJUSTE PROXIMO ANO ========') 
        console.log(`\nNúmero de Funcionários que Ganharam Reajuste: ${tam}`)
        console.log(`\nSalário Médio Reajustado: ${mediareajus.toFixed(1)}`)
         
    }  
    console.log()
    prompt('Pressione enter para continuar!!')  
}

