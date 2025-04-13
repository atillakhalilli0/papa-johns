import BASE_URL from "./config.js"

const getAllCategories = async () => {
    try {
        const res = await fetch(`${BASE_URL.GET}/category`)
        if (!res.ok) {
            throw new Error(`Problem occured related with restAPI`)
        }
        const data = await res.json()
        return data
        
    } catch (error) {
        console.error(`error message: ${error.message}`);
    }
}

const swiperData = async (data) => {
    try {
        const res = await fetch(`${BASE_URL.GET}/${data.category}`);
        if (!res.ok) {
            throw new Error("Problem occured related with restAPI");
        }
        const menuData = await res.json();
        return menuData;
    } catch (error) {
        console.error(`error message: ${error.message}`);
        return [];
    }
}

const categoryData = async (data) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("id");
    const menu = data.find((item) => item.category == code); 

    if (!menu) {
        console.error("Category not found");
        return [];
    }

    try {
        const res = await fetch(`${BASE_URL.GET}/${menu.category}`);
        if (!res.ok) {
            throw new Error("Problem occured related with restAPI");
        }
        const menuData = await res.json();
        return menuData;
    } catch (error) {
        console.error(`error message: ${error.message}`);
        return [];
    }
}

const categoryDel = async (id, data) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("id");
    const menu = data.find((item) => item.category == code); 

    console.log(id);
    
    if (!menu) {
        console.error("Category not found");
        return [];
    }

    try {
        const res = await fetch(`${BASE_URL.GET}/${menu.category}/${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) {
            throw new Error("Problem occured related with restAPI");
        }
        const menuData = await res.json();
        return menuData;
    } catch (error) {
        console.error(`error message: ${error.message}`);
        return [];
    }
}

const createProduct = async (product) => {
    const data = await getAllCategories();
    const params = new URLSearchParams(window.location.search);
    const code = params.get("id");
    const menu = data.find((item) => item.category == code); 

    if (!menu) {
        console.error("Kategori bulunamadı");
        return [];
    }

    try {
        const res = await fetch(`${BASE_URL.GET}/${menu.category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        if (!res.ok) {
            throw new Error(`Post da xetta bas verdi, status: ${res.status}`)
        }
        return res
    } catch (error) {
        console.log(error.message);
    }
}

const updateProduct = async (id, product) => {
    const data = await getAllCategories();
    const params = new URLSearchParams(window.location.search);
    const code = params.get("id");
    const menu = data.find((item) => item.category == code); 
    try {
        const res = await fetch(`${BASE_URL.POST}/${menu.category}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        if (!res.ok) {
            throw new Error(`Post da xetta bas verdi, status: ${res.status}`)
        }
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export {
    getAllCategories,
    swiperData,
    categoryData,
    categoryDel,
    createProduct,
    updateProduct
}