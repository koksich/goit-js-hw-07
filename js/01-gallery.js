import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
// / 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону
// элемента галереи.
// 2. Реализация делегирования на div.gallery и получение url большого изображения.
// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox.Используй CDN
// сервис jsdelivr и добавь в проект ссылки на минифицированные(.min) файлы библиотеки.
// 4. Открытие модального окна по клику на элементе галереи.Для этого ознакомься с документацией
//  и примерами.
// 5. Замена значения атрибута src элемента < img > в модальном окне перед открытием.Используй
// готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

// 1.2 рендер розмітки
const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

// 1.1 функція для створення динамічної розмітки
function createGalleryMarkup(galleryItems) {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `
      <li class="list__item">
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>
       </li>
    `;
    })
    .join("");
  return markup;
}

// 2.1 делегування і видкриття модального вікна при кліку на зобр-я
galleryContainer.addEventListener("click", openLargeImageModal);

function openLargeImageModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="1280" height="860">`,
    {
      onShow: () => {
        // обираємо keydown, тому що keypress вісдлідковує тільки натискання на клавіші, які генерують символ
        document.addEventListener("keydown", onEscapePress);
      },
      onClose: () => {
        document.removeEventListener("keydown", onEscapePress);
      },
    }
  );
  instance.show();

  function onEscapePress(event) {
    if (event.code === "Escape") instance.close();
  }
}
