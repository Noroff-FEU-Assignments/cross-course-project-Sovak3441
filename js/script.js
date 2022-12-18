const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("e-mail");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const errorSections = document.querySelector(".errorSection");


const validMail = (address) => {
  return String(address)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

document.getElementById('hamburger-menu').addEventListener('click', () => {
  document.getElementById('mobile-links-menu').style.display = 'flex';
});

form.addEventListener("submit", (e) => {
  let error = [];
  e.preventDefault();
  if (nameInput.value.length <= 5) {
    error.push("Please provide a Name of 5 characters or more");
  }
  if (!validMail(emailInput.value)) {
    console.log(validMail(emailInput.value));
    error.push("Please provide an valid e-mail address");
  }
  if (subjectInput.value.length <= 5) {
    error.push("Please provide an Subject of 5 characters or more");
  }
  if (messageInput.value.length < 20 || messageInput.length > 100) {
    error.push("Your message must be more then 20 characters, and less then 100 characters");
  }

  if(error.length < 1) {
    window.location.href = "contactrecived.html";
  } else {
    let infoElem = "";
    error.forEach(err => {
      infoElem += `<p class="error">${err}</p>`;
    });
    errorSections.innerHTML = infoElem;
  }
});

