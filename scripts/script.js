// alert("connected");

var smallScreenMenuIcons = document.querySelector(".small-screen-menu-icons");
var navDisplayToggle = false;
var smallScreenMenu = document.querySelector(".small-screen-menu");
var hamburgerIcon = document.querySelector(".hamburger-icon");
var closeIcon = document.querySelector(".close-icon");
var swimmingPopup = document.querySelector(".swimming-popup");
var swimmingPoolHighlight = document.querySelector(".swimmingpoolhighlight");
var popupcloseIcon = document.querySelector(".popup-close-icon");






closeIcon.style.display = "none";
smallScreenMenu.style.display = "none";
smallScreenMenuIcons.addEventListener("click", function () { 
    navDisplayToggle = !navDisplayToggle;
    
    if (navDisplayToggle === true) {

        smallScreenMenu.style.display = "flex"; 
        closeIcon.style.display = "block";
        hamburgerIcon.style.display = "none";
        
    }else{
        smallScreenMenu.style.display = "none"; 
        closeIcon.style.display = "none";
        hamburgerIcon.style.display = "block";
    }

})


swimmingPopup.style.display = "none";
swimmingPoolHighlight.addEventListener("click", function () {
    swimmingPopup.style.display = "flex";

})
 popupcloseIcon.addEventListener("click", function () {
    swimmingPopup.style.display = "none";
})




var arrayOfComments = [];

var testimonialName = document.querySelector(".testimonial-name");
var testimonialImg = document.querySelector(".testimonial-img");
var testimonialText = document.querySelector(".testimonial-content");
var testimonialButtonLeft = document.querySelector(".testimonial-button-left");
var testimonialButtonRight = document.querySelector(".testimonial-button-right");
var testimonialsWrapper = document.querySelector("testimonials-wrapper");


fetch("https://dummyjson.com/comments")
      .then(res => res.json())
      .then(data => {

          console.log(data);
          arrayOfComments = data.comments;

          arrayOfComments.map(comment => {
          // Create the testimonial card
          const card = document.createElement("div");
          card.classList.add("testimonial-card");

       
          const randomDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

          // Build the card’s HTML
          card.innerHTML = `
            <div class="testimonial-upper">
              <div class="testimonial-upper-left">
                <p class="testimonial-name">${comment.user.fullName}</p>
                <p>${randomDate.toLocaleDateString()}</p>
              </div>
              <div class="testimonial-upper-right">
                <img src="https://img.icons8.com/?size=100&id=7819&format=png&color=007bff" alt="${comment.user.username}" class="testimonial-user-img" />
              </div>
            </div>
            <p class="testimonial-content">${comment.body}</p>
          `;

                testimonialsWrapper.appendChild(card);
            
        });
          console.log(arrayOfComments);   
      }).catch(err => console.error("Error:", err));


   
testimonialButtonLeft.addEventListener('click', function () {
    
    alert("clicked");



})


function renderTestimonials() {
      testimonialsWrapper.innerHTML = ""; // clear old content

      const visibleComments = arrayOfComments.slice(currentIndex, currentIndex + visibleCount);

    // const visibleComments = arrayOfComments.slice(1, 3); 0, 1, 2 1, 2

      visibleComments.forEach(comment => {
        const card = document.createElement("div");
        card.classList.add("testimonial-card");

        const randomDate = new Date(
          2025,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        );

        const name = comment.user.fullName || comment.user.username;

        card.innerHTML = `
          <div class="testimonial-upper">
            <div class="testimonial-upper-left">
              <p class="testimonial-name">${name}</p>
              <p>${randomDate.toLocaleDateString()}</p>
            </div>
            <div class="testimonial-upper-right">
              <img src="${comment.user.image || 'https://img.icons8.com/?size=100&id=7819&format=png&color=007bff'}" 
                   alt="${comment.user.username}" 
                   class="testimonial-user-img" />
            </div>
          </div>
          <p class="testimonial-content">${comment.body}</p>
        `;

        testimonialsWrapper.appendChild(card);
      });

      // disable/enable buttons
      testimonialButtonLeft.disabled = currentIndex <= 0;
      testimonialButtonRight.disabled = currentIndex + visibleCount >= arrayOfComments.length;
    }


 testimonialButtonRight.addEventListener("click", () => {
      if (currentIndex + visibleCount < arrayOfComments.length) {
        currentIndex += visibleCount; 
        renderTestimonials();
      }
    });

    testimonialButtonLeft.addEventListener("click", () => {
      if (currentIndex - visibleCount >= 0) {
        currentIndex -= visibleCount;
      } else {
        currentIndex = 0;
      }
      renderTestimonials();
    });