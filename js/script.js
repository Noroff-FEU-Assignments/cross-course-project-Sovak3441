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
/*
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
    error.push("Please provide an valid e-mail address");
  }
  if (subjectInput.value.length <= 5) {
    error.push("Please provide an Subject of 5 characters or more");
  }
  if (messageInput.value.length < 20 || messageInput.length > 100) {
    error.push("Your message must be more then 20 characters, and less then 100 characters");
  }

  if (error.length < 1) {
    window.location.href = "contactrecived.html";
  } else {
    let infoElem = "";
    error.forEach(err => {
      infoElem += `<p class="error">${err}</p>`;
    });
    errorSections.innerHTML = infoElem;
  }
});
*/
const addAllDataToPage = (result) => {
  console.log(result);
  const mainContainer = document.querySelector("#main_product_container");

  let pageElement = "";
  result.forEach((row) => {
    pageElement += `
    <div class="game-card">
        <img alt="cover image" class="game-cover-image" src="${row.images[0].src}" />
        <div class="game-info">
          <h2>${row.name}</h2>
          <div class="game-text">
            <p>${row.description}.</p>
          </div>
          <div class="cta-area">
            <!--<a href="checkout.html"><button  class="cta-button">Buy</button></a>-->
            <a href="productdetails.html?pid=${row.id}">Read More</a>
          </div>

        </div>
      </div>
    `;
  });

  mainContainer.innerHTML = pageElement;
}

const addDetailsDataToPage = (result) => {
  const detailElement = document.querySelector("#product_details_container");
  let detailsObj = `
  <h1>Product Details</h1>
    <h2>${result.name}</h2>

    <div class="game-card-details">
      <img alt="cover image" class="game-cover-image-details" src="${result.images[0].src}" />
      <div class="game-info">
        <div class="game-text">
          <p>${result.description}</p>
          </div>

      </div>
  `;
  detailElement.innerHTML = detailsObj;
}

const usefetchAll = () => {
  const results = [];
  fetch("https://cms.neshagen.no/wp-json/wc/store/products")
    .then(data => data.json())
    .then(res => {
      res.forEach((row) => {
        results.push(row);
      });
      addAllDataToPage(results);
    })
    .catch(err => {
      console.warn(err);
      document.querySelector("#main_product_container").innerHTML = err;
    });
}

const usefetchDetails = (param) => {
  fetch(`https://cms.neshagen.no/wp-json/wc/store/products/${param}`)
    .then(data => data.json())
    .then(res => {
      console.log(res);

      addDetailsDataToPage(res);
    })
    .catch(err => {
      console.warn(err);
      document.querySelector(".results").innerHTML = err;
    });
}

