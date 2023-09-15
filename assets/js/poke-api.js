const pokeApi = {}

function convertendoParaObjeto(pokemonsDetails){
   // console.log(pokemonsDetails)
    const pokemon = new Pokemon() // criando um objeto pokemon e atribuindo valores 
    pokemon.number = pokemonsDetails.id
    pokemon.name = pokemonsDetails.name
    const types =  pokemonsDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonsDetails.sprites.other.home.front_default

    return pokemon
}

pokeApi.getPokemonDetails = (pokemon) => {
    // fetch na url de pokemons: name , url
    // caso chamado um timeOut para a o tempo de resposta a função de retorno se torna assincrona
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertendoParaObjeto)  //retorna a calklback de sucesso caso, chamada da função como retorno.
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((userDeatils) => Promise.all(userDeatils))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}
