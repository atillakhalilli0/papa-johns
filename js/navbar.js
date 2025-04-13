import BASE_URL from "./config.js";
import { getAllCategories } from "./service.js";

let cats = [];

async function showCategories() {
  cats = await getAllCategories();
  // console.log(cats);
  printCats();
}
showCategories();

function printCats() {
  cats.forEach((cat) => {
    document.getElementById("navbar").innerHTML += `
            <li>
                <a href="https://papa-johns-byatilla.vercel.app/?id=${cat.category}" class="">
                    ${cat.category}
                </a>
            </li>
        `;
    document.getElementById("footerList").innerHTML += `
            <li class="my-1"><a class="hover:underline" href="https://papa-johns-byatilla.vercel.app/?id=${cat.category}" class="">
                    ${cat.category}
                </a></li>
        `;
  });
}
