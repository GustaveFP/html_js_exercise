console.log('hola bola Nando')

const BASE_URL = 'https://pokeapi.co/api/v2/type';
const ulItems = document.getElementById('types-list').getElementsByTagName('li');

for(let i=0; i < ulItems.length; i++){
    ulItems[i].addEventListener('click', setActive);
}

function setActive(event){
    try{
        document.querySelector('.active').classList.remove('active');
    }
    catch(_){};

    event.target.classList.add('active');


// Peticion Ajax

const pokemonType = event.target.textContent.toString();

fetch(`${BASE_URL}/${pokemonType.toLowerCase()}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.getElementById('type-data').innerHTML=`
        <h2>${pokemonType}</h2>
        <div>
            <div>
                <h4>Attacks pros & cons</h5>
                    <div>
                        <p>Normal moves are not very effective against <strong>${pokemonType}</strong>:</p>
                        <ul>
                            ${data.damage_relations.no_damage_to.map(pokemon => `<li>${pokemon.name}</li>`).join(' ')}
                        </ul>
                    </div>
                <div>
                    <p><strong>${pokemonType}</strong> moves have no effect on:</p>
                    <ul>
                        ${data.damage_relations.half_damage_to.map(pokemon => `<li>${pokemon.name}</li>`).join(' ')}
                    </ul>
                </div>
            </div>
        
            <div>
                <h4>Defense pros & cons</h5>
                <div>
                    <p>This types have no effect on <strong>${pokemonType}</strong> pokémon:</p>
                    <ul>
                        ${data.damage_relations.no_damage_from.map(pokemon => `<li>${pokemon.name}</li>`).join(' ')}
                    </ul>
                </div>
                <div>
                    <p>This types are super effective on <strong>${pokemonType}</strong> pokémon:</p>
                    <ul>
                        ${data.damage_relations.double_damage_from.map(pokemon => `<li>${pokemon.name}</li>`).join(' ')}
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <h4>Pokémon</h4>
            <ul>
                ${data.pokemon.map(pokemon => `<li>${pokemon.pokemon.name}</li>`).join(' ')}
            </ul>
        </div>
  `;       
})
.catch(error => console.log(error.message));
}