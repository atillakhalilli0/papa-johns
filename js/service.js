import BASE_URL from "./config.js"

const getAllCategories = async () => {
    try {
        const res = await fetch(`${BASE_URL.GET}/category`);
        if (!res.ok) throw new Error("restAPI ilə problem yarandı!");
        return await res.json();
    } catch (error) {
        console.error(`error message: ${error.message}`);
        return [];
    }
};

const swiperData = async (data) => {
    try {
        const res = await fetch(`${BASE_URL.GET}/${data.category}`);
        if (!res.ok) throw new Error("restAPI ilə problem yarandı!");
        return await res.json();
    } catch (error) {
        console.error(`error message: ${error.message}`);
        return [];
    }
};

const categoryData = async (data) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("id");
    const menu = data.find((item) => item.category == code); 

    if (!menu) {
        console.error("Kateqoriya tapılmadı!");
        return [];
    }

    try {
        const res = await fetch(`${BASE_URL.GET}/${menu.category}`);
        if (!res.ok) throw new Error("restAPI ilə problem yarandı!");
        return await res.json();
    } catch (error) {
        console.error(`error message: ${error.message}`);
        return [];
    }
};

const categoryDel = async (id, data) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("id");
    const menu = data.find((item) => item.category == code); 

    if (!menu) {
        console.error("Kateqoriya tapılmadı!");
        return [];
    }

    try {
        const res = await fetch(`${BASE_URL.GET}/${menu.category}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error("restAPI ilə problem yarandı!");
        return await res.json();
    } catch (error) {
        console.error(`error message: ${error.message}`);
        return [];
    }
};

const createProduct = async (product, data) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("id");
    const menu = data.find((item) => item.category == code); 

    if (!menu) {
        console.error("Kateqoriya tapılmadı!");
        return { ok: false };
    }

    try {
        const res = await fetch(`${BASE_URL.GET}/${menu.category}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        if (!res.ok) throw new Error(`POST problemi var! Status: ${res.status}`);
        const newProduct = await res.json();
        return { ok: true, newProduct };
    } catch (error) {
        console.log(error.message);
        return { ok: false };
    }
};

const updateProduct = async (id, product, data) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("id");
    const menu = data.find((item) => item.category == code); 

    if (!menu) {
        console.error("Kateqoriya tapılmadı!");
        return { ok: false };
    }

    try {
        const res = await fetch(`${BASE_URL.POST}/${menu.category}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        if (!res.ok) throw new Error(`PUT metodunda problem var! Status: ${res.status}`);
        return { ok: true };
    } catch (error) {
        console.log(error.message);
        return { ok: false };
    }
};

export {
    getAllCategories,
    swiperData,
    categoryData,
    categoryDel,
    createProduct,
    updateProduct
};
