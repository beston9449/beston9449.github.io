`strict`;

document.addEventListener("DOMContentLoaded", () => {
  const accBoxes = document.querySelectorAll(".accBox");

  for (let i = 0; i < accBoxes.length; i++) {
    // adding click listening to each button
    accBoxes[i].addEventListener("click", function () {
      // if accbox contains the class selected
      if (accBoxes[i].classList.contains("selected")) {
        // if it does then remove it
        accBoxes[i].classList.remove("selected");
      } else {
        // and if it does not add it to it mimicks the clicking and selectng
        accBoxes[i].classList.add("selected");
      }
    });
  }
});
