// Mendapatkan elemen form dan img-wrapper
const form = document.querySelector('form');
const imgWrapper = document.querySelector('.img-wrapper');

// Mendapatkan elemen input file
const uploadImage = document.querySelector('#uploadImage');

// Mendapatkan elemen span dengan class "select"
const browseSpan = document.querySelector('.select');

// Menambahkan event listener pada elemen span "Browse"
browseSpan.addEventListener('click', () => {
  // Memanggil click event pada elemen input file
  uploadImage.click();
});

// Menambahkan event listener pada elemen img-wrapper
imgWrapper.addEventListener('dragover', (e) => {
  // Membatalkan perilaku default dragover
  e.preventDefault();

  // Menambahkan class dragover pada img-wrapper
  imgWrapper.classList.add('dragover');
});

imgWrapper.addEventListener('dragleave', () => {
  // Menghapus class dragover pada img-wrapper
  imgWrapper.classList.remove('dragover');
});

imgWrapper.addEventListener('drop', (e) => {
  // Membatalkan perilaku default drop
  e.preventDefault();

  // Menghapus class dragover pada img-wrapper
  imgWrapper.classList.remove('dragover');

  // Mendapatkan file yang di-drop
  const files = e.dataTransfer.files;

  // Memanggil fungsi handleFiles dengan parameter files
  handleFiles(files);
});

// Menambahkan event listener pada elemen input file
uploadImage.addEventListener('change', (e) => {
  // Mendapatkan file yang dipilih
  const files = e.target.files;

  // Memanggil fungsi handleFiles dengan parameter files
  handleFiles(files);
});

function handleFiles(files) {
  // Your existing code to handle files goes here

  // Add the code to preview images in the imageContainer
  const imageContainer = document.getElementById('imageContainer');

  for (const file of files) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imagePreview = document.createElement('div');
      imagePreview.classList.add('col-sm-2', 'image');
      imagePreview.innerHTML = `
        <img src="${e.target.result}" alt="" />
        <span class="remove">&times;</span>
      `;

      // Add event listener to remove the image on click
      imagePreview.querySelector('.remove').addEventListener('click', function () {
        imagePreview.remove();
      });

      imageContainer.appendChild(imagePreview);
    };

    reader.readAsDataURL(file);
  }
}
