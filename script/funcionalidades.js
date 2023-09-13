const inputInserir = document.querySelector('[data-inserir]')

if (inputInserir) {
    inputInserir.value = 'Adicionar' // Muda o texto dentro do input
}

const boxAniversariante = document.querySelector('[data-aniversariante]')
boxAniversariante.style.display = 'none'

const inputRadioSim = document.querySelector('[data-radioSim]')
const inputRadioNao = document.querySelector('[data-radioNao]')
const inputPresente = document.querySelector('[data-presenteFormulario]')
const inputRadioSimSelecionado = document.querySelector('[data-interiorRadioSim]')
const inputRadioNaoSelecionado = document.querySelector('[data-interiorRadioNao]')

inputRadioSim.addEventListener('click', () => {
    if (inputRadioSim) {
        inputRadioSimSelecionado.style.display = 'block'
        inputPresente.style.display = 'block'
        inputPresente.required = true
        inputRadioNaoSelecionado.style.display = 'none'
    } else {
        inputRadioSimSelecionado.style.display = 'none'
        inputPresente.style.display = 'none'
        inputPresente.required = false
        inputRadioNaoSelecionado.style.display = 'block'
    }
})

inputRadioNao.addEventListener('click', () => {
    if (inputRadioNao) {
        inputRadioNaoSelecionado.style.display = 'block'
        inputPresente.style.display = 'none'
        inputPresente.required = false
        inputRadioSimSelecionado.style.display = 'none'
    } else {
        inputRadioNaoSelecionado.style.display = 'none'
        inputRadioSimSelecionado.style.display = 'block'
        inputPresente.style.display = 'block'
        inputPresente.required = true
    }
})

const inputNome = document.querySelector('[data-nomeFormulario]')
inputNome.addEventListener('input', () => {
    let valorInput = inputNome.value
    let regexNome = /^(?:[a-zA-Z](?: [a-zA-Z])*)+$/
    let resultadoRegex = regexNome.exec(valorInput)

    if(!resultadoRegex) {
        inputNome.value = valorInput.replace(/\d/g, '')
    }
})

// Nesse trecho o sistema automaticamente verifica se os 'Inputs' estão com valores inseridos para ativar o botão de 'Adicionar' os dados
const inputData = document.querySelector('[data-dataFormulario]')
// Faço a verificação dos 'Inputs' que se caso eles estiverem sem preencher o botão de 'Inserir' ficará desabilitado
function verificarInputs() {
    if (inputNome.value === '' || inputData.value === '' || (inputPresente.style.display === 'block' && inputPresente.value === '')) {
        inputInserir.style.opacity = '0.5'
        inputInserir.style.pointerEvents = 'none'
    } else if (inputRadioSim.checked || inputRadioNao.checked) {
        inputInserir.style.opacity = '1'
        inputInserir.style.pointerEvents = 'auto'
    }
}

// Chamo um 'Input' por vez para fazer a verificação toda vez q o 'Input' for alterado 
inputNome.addEventListener('input', verificarInputs)
inputData.addEventListener('input', verificarInputs)
inputRadioSim.addEventListener('input', verificarInputs)
inputRadioNao.addEventListener('input', verificarInputs)
inputPresente.addEventListener('input', verificarInputs)

// Nessa função ela formata a exibição da data para 'pt-BR' e tambem verifica se a data inserida pelo osuario está correta
function formatarData(data) {
    // .splite divide o 'Array' em parte e como parametro coloco o que separa as 'Strings'
    const partes = data.split('-')
    const dia = partes[2]
    const mes = partes[1]
    const ano = partes[0]

    let dataAtual = new Date()
    let anoAtual = dataAtual.getFullYear()
    
    if (ano > anoAtual) {
        return('00/00/0000')
    }
    
    return `${dia}/${mes}/${ano}`
}