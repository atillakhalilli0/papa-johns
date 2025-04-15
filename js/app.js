import { getAllCategories, categoryData, categoryDel, createProduct, updateProduct } from "./service.js";

let data;

const cat = document.getElementById("cat");
// const inpButton = document.getElementById("inpButton")
async function getData() {
    data = await getAllCategories();
    renderCategories();
}
getData();

export async function renderCategories() {
    const menuData = await categoryData(data)
    spinner.style.display = "none"
    swipersSection.innerHTML = ""
    cat.innerHTML = ""
    menuData.forEach(item => {    
    $("#inpButton").show();
        cat.innerHTML += `
        <div id="card" class="bg-white dark:bg-green-800 rounded-lg shadow-2xl overflow-hidden">
            <div class="h-64 overflow-hidden">
                <!-- Image placeholder -->
                <img onerror="this.src='https://imgs.search.brave.com/rTUyGvW7l7ytTuWvFFOH8pu4wO01bsfKlbTfpLM_UEY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgy/NzYzMTAyL3Bob3Rv/L3dhcm5pbmcuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWVs/NVZWdmt4VEZqQ2ho/emdTYk12bV9WOC1n/UVhUUnBpZ21IbFF2/YlhKU2s9'" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" src="${item.img}" alt="Pizza">
            </div>
            <div class="p-4">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${item.title}</h3>
                <p class="xl:w-[80%] text-gray-600 mb-3">${item.composition}</p>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-red-600 dark:text-white">${item.price} ₼</span>
                    <div>
                        <button onclick="handleEdit('${item.id}')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button onclick="deletePizza('${item.id}', '${item.title}')" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"><i class="fa-solid fa-ban"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
    });
}

window.deletePizza = async function(id, title) {
    const result = await Swal.fire({
        title: `Məhsulu silmək istədiyinizə əminsiniz?`,
        text: `"${title}" silinəcək və bu geri qaytarıla bilməz!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Bəli, sil",
        cancelButtonText: "İmtina et",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
    });

    if (result.isConfirmed) {
        await categoryDel(id, data);
        Swal.fire("Silindi!", `"${title}" uğurla silindi.`, "success");
        getData();
    }
}

window.openPostForm = function () {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("id");
    $("#inputSection").toggle(300);
    $("#addTitle").html(`Add a new ${cat}`)
}

const inps = document.querySelectorAll("#inputSection input")

function getInpValues() {
    
    const valuesObj = {
        title: inps[0].value,   
        price: inps[1].value,
        img: inps[2].value,
        composition: inps[3].value
    }
    return valuesObj
}

window.createPost = async function (event) {
    event.preventDefault();
    const newProduct = getInpValues();
    const res = await createProduct(newProduct);
    if (res?.ok) {
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });
        getData();
        $("#inputSection").hide(300)
        globId = null;
        inps.forEach(inp => inp.value = "")
    } else {
        Swal.fire({
            icon: "error",
            title: "Xəta!",
            text: "Məhsul əlavə edilərkən xəta baş verdi",
        });
    }
}

let globId = null;

window.handleEdit = function (id) {
    categoryData(data).then(menuData => {
        const edProduct = menuData.find(item => item.id == id);
        if (edProduct) {
            globId = id;
            inps[0].value = edProduct.title;
            inps[1].value = edProduct.price;
            inps[2].value = edProduct.img;
            inps[3].value = edProduct.composition;
            
            if ($("#inputSection").is(":hidden")) {
                $("#inputSection").show(300);
            }
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
};

window.updatePost = async function () {
    const updatedObj = getInpValues();

    const res = await updateProduct(globId, updatedObj);
    if (res?.ok) {
        Swal.fire({
            title: "Uğurla yeniləndi!",
            text: "Məhsul məlumatları dəyişdirildi.",
            icon: "success"
        });
        getData(); 
        $("#inputSection").hide(300)
        globId = null;
        inps.forEach(inp => inp.value = "")
    } else {
        Swal.fire({
            icon: "error",
            title: "Xəta!",
            text: "Yeniləmə zamanı problem yarandı.",
        });
    }
};

