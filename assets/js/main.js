
var buttonPaginationUp = document.querySelector('#loadButtonUp');
const buttonPaginationDown = document.querySelector('#loadButtonDown');

const maxRecords = 155
let offset = 0;
let limit = 12; // refente ao limit do offset


const pokemonOl = document.getElementById('pokemonList');

function paginationPokemonLoad(offset, limit){
    //remove o conteudo anterior a cada nova requisição
    if(offset > 0 || offset < 2){
        validaçãoDirecaoPaginacao()
    }

    console.log(offset)
    
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => { // O método map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
        const newHtml = pokemonList.map(atualizarConteudo).join('')
       // console.log(newHtml);
        pokemonOl.innerHTML += newHtml
    
    })
}

paginationPokemonLoad(offset, limit)
 // vai tornar a funcção dinamica ao ser chamada

function validaçãoDirecaoPaginacao(){
        while(pokemonOl.firstChild) {
            pokemonOl.removeChild(pokemonOl.firstChild);
        }  
}

function atualizarConteudo(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#0${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

buttonPaginationDown.addEventListener('click', () => {
    offset += limit // concatenando o valor limit ao valor do offset inicial
    const qtdPaginationRecords = offset + limit

    // Verificação 
    if(offset > 0){
        buttonPaginationUp.style.display = "block"
    }
    if(qtdPaginationRecords >= maxRecords){
        const newLimit = maxRecords - offset // numero total - o offset atual
        paginationPokemonLoad(offset, newLimit)
        
        buttonPaginationDown.parentElement.removeChild(buttonPaginationDown)
    } else {
        paginationPokemonLoad(offset, limit)
    }
})

buttonPaginationUp.addEventListener('click', () => {
        offset -= limit
        paginationPokemonLoad(offset, limit)

        if(offset === 0){
            buttonPaginationUp.style.display = "none"
        } else if(offset > 0){
            buttonPaginationUp.style.display = "block" // armengue kk 
        }
})

