import { getAllCategories, categoryData, categoryDel, createProduct, updateProduct } from "./service.js"

let data = [];
let globId = null;

const cat = document.getElementById("cat");
const spinner = document.getElementById("spinner");
const swipersSection = document.getElementById("swipersSection");
const inps = document.querySelectorAll("#inputSection input");

async function getData() {
    data = await getAllCategories();
    renderCategories();
}
getData();

export async function renderCategories() {
    const menuData = await categoryData(data);
    spinner.style.display = "none";
    cat.innerHTML = "";

    menuData.forEach(item => {
        $("#inpButton").show();
        swipersSection.style.display = "none";

        cat.innerHTML += `
            <div id="card" class="bg-white dark:bg-green-800 rounded-lg shadow-2xl overflow-hidden">
                <div class="h-64 overflow-hidden">
                    <img onerror="this.src='https://via.placeholder.com/300'" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" src="${item.img}" alt="Product">
                </div>
                <div class="p-4">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${item.title}</h3>
                    <p class="xl:w-[80%] text-gray-600 dark:text-white mb-3">${item.composition}</p>
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
        data = data.filter(item => item.id != id);
        renderCategories();

        Swal.fire("Silindi!", `"${title}" uğurla silindi.`, "success");
    }
};

window.openPostForm = function () {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("id");
    $("#inputSection").toggle(300);
    $("#addTitle").html(`Add a new ${cat}`);
};

function getInpValues() {
    return {
        title: inps[0].value,
        price: inps[1].value,
        img: inps[2].value,
        composition: inps[3].value
    };
}

window.createPost = async function (event) {
    event.preventDefault();
    const newProduct = getInpValues();

    const res = await createProduct(newProduct, data);
    if (res?.ok) {
        if (res.newProduct?.id) {
            data.push(res.newProduct);
        } else {
            await getData();
        }
        renderCategories();

        Swal.fire("Əla!", "Yeni məhsul əlavə edildi!", "success");
        $("#inputSection").hide(300);
        globId = null;
        inps.forEach(inp => inp.value = "");
    } else {
        Swal.fire("Xəta!", "Məhsul əlavə edilərkən xəta baş verdi", "error");
    }
};

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

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
};

window.updatePost = async function () {
    const updatedObj = getInpValues();
    const res = await updateProduct(globId, updatedObj, data);

    if (res?.ok) {
        const index = data.findIndex(item => item.id == globId);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedObj };
        }
        renderCategories();

        Swal.fire("Uğurla yeniləndi!", "Məhsul məlumatları dəyişdirildi.", "success");
        $("#inputSection").hide(300);
        globId = null;
        inps.forEach(inp => inp.value = "");
    } else {
        Swal.fire("Xəta!", "Yeniləmə zamanı problem yarandı.", "error");
    }
};
