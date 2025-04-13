import { createPizza, deletePizzaById, getAllPizzas, updatePizza } from "./service.js";
let data = []

async function showPizzas() {
    data = await getAllPizzas()
    printPizzas()
}
showPizzas()

function printPizzas() {
    data.forEach(pizza => {
        document.getElementById("cards").innerHTML += `
            <div id="card" class="bg-white rounded-lg shadow-2xl overflow-hidden">
                <div class="h-64 overflow-hidden">
                    <!-- Image placeholder -->
                    <img class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" src="${pizza.img}" alt="Pizza">
                </div>
                <div class="p-4">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${pizza.title}</h3>
                    <p class="xl:w-[80%] text-gray-600 mb-3">${pizza.composition}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-semibold text-red-600">${pizza.price} ₼</span>
                        <div>
                            <button onclick="handleEdit('${pizza.id}')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                            <button onclick="deletePizza('${pizza.id}')" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"><i class="fa-solid fa-ban"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}

window.deletePizza = function(id){
    deletePizzaById(id)
}

window.openPostForm = function () {
    $("#inputSection").toggle(500);
}

const inps = document.querySelectorAll("#inputSection input")

function getInpValues() {
    
    const valuesObj = {
        title: inps[0].value,
        composition: inps[1].value,
        img: inps[2].value,
        price: inps[3].value
    }
    return valuesObj
}

window.createPost = function () {    
    const newPizza = getInpValues()
    console.log(newPizza);
    createPizza(newPizza)
}

let globId 

window.handleEdit = function (id) {
    const edPizza = data.find(item => item.id == id)
    globId = id
    inps[0].value = edPizza.title
    inps[1].value = edPizza.composition
    inps[2].value = edPizza.img
    inps[3].value = edPizza.price
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

window.updatePost = function () {
    const updatedObj = getInpValues()
    updatePizza(globId, updatedObj)
}