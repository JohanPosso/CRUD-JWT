let containerData = [];

const templateElement = document.getElementById("templateElement").content;
// const templateEdit = document.getElementById("templateEdit").content;
const tablebody = document.getElementById("tablebody");
const form = document.querySelector("#form");
const submitData = document.querySelector(".submitData");
const fragment = document.createDocumentFragment();
const btnSaveEdit = document.getElementById("btnSaveEdit");
const btnEditar = document.getElementById("btnEditar");

// Variable Form
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const phone = document.getElementById("phone");
const company = document.getElementById("company");
const email = document.getElementById("email");

// Regular Expression

const expression = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

tablebody.addEventListener("click", (e) => {
  eliminarData(e);
  editarData(e);
});

form.addEventListener("submit", (e) => {
  const person = [
    {
      id: containerData.length + 1,
      name: name.value,
      lastname: lastname.value,
      phone: phone.value,
      company: company.value,
      email: email.value,
    },
  ];
  // Validation empty field
  if (!name.value == "" || !lastname.value == "") {
    containerData.push(...person);
    console.log("Hola");
  }

  showData();

  e.stopPropagation();
  e.preventDefault();
  form.reset();
});

const showData = () => {
  while (tablebody.firstChild) {
    tablebody.removeChild(tablebody.firstChild);
  }
  let id = 0;
  const regex = /^[0-9]\d*$/;

  containerData.forEach((item) => {
    id++;

    templateElement.querySelector("#btnEliminar").dataset.id = item.id;
    templateElement.querySelector("#btnEditar").dataset.id = item.id;
    templateElement.querySelector("#idElement").textContent = id;
    templateElement.querySelector("#nameElement").textContent = item.name;
    templateElement.querySelector("#lastNameElement").textContent =
      item.lastname;
    templateElement.querySelector("#phoneElement").textContent = item.phone;
    templateElement.querySelector("#companyElement").textContent = item.company;
    templateElement.querySelector("#emailElement").textContent = item.email;

    const clone = templateElement.cloneNode(true);
    fragment.appendChild(clone);
  });

  tablebody.appendChild(fragment);
};

const eliminarData = (e) => {
  if (e.target.classList.contains("btn-danger")) {
    e.target.parentNode.parentNode.remove(); // Elimina el elemento en el DOM
    const findElement = containerData.find(
      (ele) => ele.id == e.target.dataset.id
    ); //Busca un elemento con esa condicion
    const positionElement = containerData.indexOf(findElement); // Encuentra la posicion de ese elemento
    containerData.splice(positionElement, 1); // Elimina el elemento en el array
  }
};

// Pending
const editarData = (e) => {
  if (e.target.classList.contains("btn-warning")) {
    const findElement = containerData.find(
      (ele) => ele.id == e.target.dataset.id
    );

    if (e.target.dataset.id == findElement.id) {
      name.value = findElement.name;
      lastname.value = findElement.lastname;
      phone.value = findElement.phone;
      company.value = findElement.company;
      email.value = findElement.email;
    }
  }
};
