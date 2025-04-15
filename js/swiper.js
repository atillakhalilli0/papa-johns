import { getAllCategories, swiperData } from "./service.js";

let data;
const swipersSection = document.getElementById("swipersSection");

async function getData() {
  data = await getAllCategories();
  renderList();
}

getData();

async function renderList() {  
  const spinner = document.getElementById("spinner");
  spinner.style.display = "flex";
  swipersSection.innerHTML = "";
  spinner.style.display = "none"; 
  swipersSection.innerHTML = `
    <div>
      <div class="space-y-16">
        ${(
          await Promise.all(
            data.map(async (cat) => {
              const items = await swiperData(cat);
              return `
            <div class="swiper-container">
              <div class="flex justify-between items-center mb-8">
                <a href="http://127.0.0.1:5500/index.html?id=${cat.category}" class="text-3xl font-bold dark:text-white text-gray-800 capitalize">
                  <span class="border-b-4 border-red-500 pb-1">${
                    cat.category
                  }</span>
                </a>
                <div class="flex items-center space-x-2">
                  <button class="swiper-prev-${
                    cat.category
                  } bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button class="swiper-next-${
                    cat.category
                  } bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow transition focus:outline-none focus:ring-2 focus:ring-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div id="${cat.category}" class="swiper mySwiper">
                <div class="swiper-wrapper">
                  ${items
                    .map(
                      (item) => `
                    <div class="swiper-slide">
                        <div id="card" class="bg-white  dark:bg-green-800 rounded-xl shadow-lg overflow-hidden h-96 transition-all duration-300 hover:shadow-2xl border border-gray-100">
                            <div class="h-64 overflow-hidden relative">
                            <!-- Image with consistent height -->
                            <img class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" src="${item.img}" alt="${item.title}">
                            <!-- Subtle gradient overlay -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30"></div>
                            </div>
                            <div class="p-5">
                            <h3 class="text-xl font-bold dark:text-white text-gray-800 mb-3 line-clamp-1">${item.title}</h3>
                            <div class="flex justify-between items-center">
                                <span class="text-xl font-bold dark:text-white text-red-600">${item.price} ₼</span>
                                <span class="inline-block capitalize px-3 py-1 bg-red-50 text-red-600 dark:bg-green-50 dark:text-green-600 text-sm font-medium rounded-full">${cat.category}</span>
                            </div>
                            </div>
                        </div>
                    </div>
                  `
                    )
                    .join("")}
                </div>
                <div class="swiper-pagination-${cat.category} mt-8"></div>
              </div>
            </div>
          `;
            })
          )
        ).join("")}
      </div>
    </div>
  `;

  initializeSwipers();
}

function initializeSwipers() {
  data.forEach((cat) => {
    new Swiper(`#${cat.category}`, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: `.swiper-next-${cat.category}`,
        prevEl: `.swiper-prev-${cat.category}`,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  });
}
