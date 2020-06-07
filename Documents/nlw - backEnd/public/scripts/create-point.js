
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    .then(res => res.json() )
    .then(states => {
        for(const state of states){
             ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }     
    }) 
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value 

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json() )
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }     

        citySelect.disabled = false
    }) 

}


document
    .querySelector("select[name=uf]")  // CHANGE É MUDAR
    .addEventListener("change", getCities)

//Itens de coleta
//pegar todos os elementos de LI



const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let item of itemsToCollect){
    item.addEventListener("click", handleSelectItem)
}

selectedItems=[]

const collectedItems = document.querySelector("input[name=items]")

//função selecao da pagina itens de coleta
function handleSelectItem(event){
   const itemLi = event.target

   itemLi.classList.toggle("selected")

   const itemId = itemLi.dataset.id



  // console.log(itemId)

    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( (item) => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    }else{
        selectedItems.push(itemId)

    }
    //console.log(selectedItems)
    //console.log(    collectedItems
     //   )
    collectedItems.value = selectedItems
}

