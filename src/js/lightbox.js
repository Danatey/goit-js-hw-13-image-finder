import * as basicLightbox from 'basiclightbox';

export default function setLightbox(event) {
  const bigImgUrl = event.target.dataset.lightboxImg;
  const instance = basicLightbox.create(`
    <div class="lightbox-container">
        <img src="${bigImgUrl}" width="800" height="600">
    </div>
`);

  instance.show();
}