const formulario = document.querySelector('[data-formulario]')

const itens = JSON.parse(localStorage.getItem('itens')) || []
const lista = document.querySelector('.lista_aniversariantes')

itens.forEach( (elemento) => {
    criarElementoLista(elemento)
})

formulario.addEventListener('submit', (eventoEnviar) => {
    eventoEnviar.preventDefault()

    const nome = eventoEnviar.target.elements['nome']
    const data = eventoEnviar.target.elements['data']
    const presente = eventoEnviar.target.elements['presente']
    
    const dadosAniversariante = {
        'nome': nome.value,
        'data': formatarData(data.value), 
        'presente': presente.value
    }

    criarElementoLista(dadosAniversariante)
    
    itens.push(dadosAniversariante)
    
    localStorage.setItem('itens', JSON.stringify(itens))

    limparCampos()
    desabilitarBotao()
    desabilitarInputPresente()
})

function desabilitarInputPresente() {
    inputPresente.style.display = 'none'
}

function desabilitarBotao() {
    inputInserir.style.opacity = '0.5'
    inputInserir.style.pointerEvents = 'none'
}

function limparCampos() {
    inputNome.value = '';
    inputData.value = '';
    inputPresente.value = '';
    inputRadioSim.checked = false
    inputRadioSimSelecionado.style.display = 'none'
    inputRadioNao.checked = false
    inputRadioNaoSelecionado.style.display = 'none'
}

const IconeInterrogacao = document.querySelector('[data-iconeMensagemErro]')
const iconePresente = document.querySelector('[data-iconePresente]')

function criarElementoLista(item) {

    const aniversariante = document.createElement('li')
    aniversariante.classList.add('aniversariante')
    aniversariante.dataset.id = item.id
    
    aniversariante.innerHTML = item.nome

    const dataAniversariante = document.createElement('span')
    dataAniversariante.classList.add('data_aniversariante')
    aniversariante.appendChild(dataAniversariante)

    if (item.data != '00/00/0000') {
        aniversariante.innerHTML += item.data   
    }

    // Criará um icone de 'Interrogação' caso exiba '00/00/0000' no aniversario
    if (item.data === '00/00/0000') {
        const interrogacao = document.createElement('i')
        interrogacao.classList.add('iconeErro')
        interrogacao.innerHTML = '<img src="imgs/erro.svg">'
        aniversariante.appendChild(interrogacao)
        
        const avisoErro = document.querySelector('.aviso')
        const temporizadorDoErro = 10000
        avisoErro.style.display = 'inline-flex'
        
        function esconderAviso() {
            avisoErro.style.display = 'none'
        }

        setTimeout(esconderAviso,temporizadorDoErro)
    }

    const presenteAniversario = document.createElement('span')
    presenteAniversario.classList.add('presente_aniversariante')
    aniversariante.appendChild(presenteAniversario)

    // Nessa condição, se o 'Input' 'PresenteAniversario' estiver com algo escrito criará um icone de presente antes do resultado 'Presente'
    if (item.presente === '') {

    } else {
        const iconePresente = document.createElement('i')
        iconePresente.classList.add('IconePresente')
        iconePresente.innerHTML = '<img src="imgs/presente.svg">'
        aniversariante.appendChild(iconePresente)
    }
    
    aniversariante.innerHTML += item.presente

    aniversariante.appendChild(botaoDescartar(item.id))

    lista.appendChild(aniversariante)
    
    // Exibo no console o resultado os unputs
    console.log(aniversariante)
}

function botaoDescartar(id) {
    const lixeira = document.createElement('button')
    lixeira.classList.add('botaoDescartarItem')
    lixeira.innerHTML = '<img src="imgs/lixeira.svg">'

    lixeira.addEventListener('click', function() {
        deletaElemento(this.parentNode, id)
    })

    return lixeira
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem('itens', JSON.stringify(itens))
}
