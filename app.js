let containerData = [];

const templateElement = document.getElementById("templateElement").content;
const tablebody = document.getElementById("tablebody");
const form = document.querySelector("#form");
const submitData = document.querySelector(".submitData");
const fragment = document.createDocumentFragment();

// Variable Form
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const phone = document.getElementById("phone");
const company = document.getElementById("company");
const email = document.getElementById("email");
const password = document.getElementById("password");

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
      password: password.value,
    },
  ];

  containerData.push(...person);

  pintarCards();

  e.stopPropagation();
  e.preventDefault();
  form.reset();
});

const pintarCards = () => {
  while (tablebody.firstChild) {
    tablebody.removeChild(tablebody.firstChild);
  }

  containerData.forEach((item) => {
    templateElement.querySelector("#btnEliminar").dataset.id = item.id;
    templateElement.querySelector("#btnEditar").dataset.id = item.id;
    templateElement.querySelector("#nameElement").textContent = item.name;
    templateElement.querySelector("#idElement").textContent = item.id;
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
  console.log(containerData);
};

const eliminarData = (e) => {
  if (e.target.classList.contains("btn-danger")) {
    e.target.parentNode.parentNode.remove(); // Elimina el elemento en el DOM
    const findElement = containerData.find(
      (ele) => ele.id == e.target.dataset.id
    ); //Busca un elemento con esa condicion
    const positionElement = containerData.indexOf(findElement); // Encuentra la posicion de ese elemento
    containerData.splice(positionElement, 1); // Elimina el elemento en el array
    console.log(containerData);
  }
};

const editarData = (e) => {
  if (e.target.classList.contains("btn-warning")) {
    alert("");
  }
};
