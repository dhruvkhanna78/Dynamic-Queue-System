// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

let serviceTypeValue;
let bookingDateValue;
let bookingTimeValue;
let customerNameValue;
let num = 0;

let serviceType, bookingDate, bookingTime, customerName;
let bookingLine = [];

 serviceType = document.getElementById("serviceType");
serviceType.addEventListener("change", function(){
   serviceTypeValue = this.value;

  console.log(serviceTypeValue); 
});

 bookingDate = document.getElementById("bookingDate");
bookingDate.addEventListener("change", function(){
   bookingDateValue = this.value;
  console.log(bookingDateValue);
});

 bookingTime = document.getElementById("bookingTime");
bookingTime.addEventListener("change", function(){
   bookingTimeValue = this.value;
  console.log(bookingTimeValue);
});

 customerName = document.getElementById("customerName");
customerName.addEventListener("change", function(){
   customerNameValue = this.value;
  console.log(customerNameValue);
});

function correctindex(bookingLine, bookingDateValue, bookingTimeValue){
  if(bookingLine.length === 0){
    return 1;
  }
  let n = bookingLine.length;
  let newDateTime = new Date(`${bookingDateValue} ${bookingTimeValue}`);
  for (let index = 0; index < bookingLine.length; index++) {
    let existingDateTime = new Date(`${bookingLine[index].bookingDate} ${bookingLine[index].bookingTime}`);
    if(existingDateTime > newDateTime){
      return index;
    }
  }
  return n;
}

function isUnique(bookingLine, bookingDateValue, customerNameValue) {
  return !bookingLine.some(item => 
    item.bookingDate === bookingDateValue && item.customerName === customerNameValue
  );
}

                                      // Book now Button

let bookNow = document.getElementsByClassName("btn btn-primary")[0];

bookNow.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("Updated Booking Line:", bookingLine); 
  let serviceTypeValue = document.getElementById("serviceType").value.trim();
  let bookingDateValue = document.getElementById("bookingDate").value.trim();
  let bookingTimeValue = document.getElementById("bookingTime").value.trim();
  let customerNameValue = document.getElementById("customerName").value.trim();

  if (customerNameValue && bookingDateValue && bookingTimeValue && serviceTypeValue) {
      let queueCard = document.querySelector("#queueCard");
      let newBlock = document.createElement("div");
      newBlock.classList.add("queue-item");
      
      num += 1;
      newBlock.innerHTML = `
      
      <p class = "queue-number">${num}</p>
      <p>${serviceTypeValue}</p>
      <p>${bookingDateValue}</p>
      <p>${customerNameValue}</p>
      <p>${bookingTimeValue}</p>
      `;
      
      let unique = isUnique(bookingLine, bookingDateValue, customerNameValue);
      
      if (queueCard && unique) {
        let insertAt = correctindex(bookingLine, bookingDateValue, bookingTimeValue);
        
        bookingLine.splice(insertAt, 0, {
          bookingDate: bookingDateValue,
          bookingTime: bookingTimeValue,
          element: newBlock
        });
        let queueItems = document.querySelectorAll(".queue-item");

        // console.log(correctindex(bookingLine, bookingDateValue, bookingTimeValue));
          if (insertAt < queueCard.children.length) {
            queueCard.insertBefore(newBlock, queueItems[insertAt]);
          } else {
            queueCard.appendChild(newBlock); 
          }
          
          queueItems = queueCard.querySelectorAll(".queue-item");
          queueItems.forEach((item, index) =>{
            let queueNumber = item.querySelector(".queue-number");
            queueNumber.textContent = index + 1;
          });
          
        } else {
          console.error("queueCard not found!");
      }

      alert("Successfully Submitted!");


      document.getElementById("serviceType").value = "";
      document.getElementById("bookingDate").value = "";
      document.getElementById("bookingTime").value = "";
      document.getElementById("customerName").value = "";
  } else {
    
      alert("Please fill all fields before booking!");  
  }
});


                        // Call next customer Button

let callNextCustomer = document.querySelector(".service-counter .btn-primary");

callNextCustomer.addEventListener("click", function(){


      document.getElementById("serviceType").value = "";
      document.getElementById("bookingDate").value = "";
      document.getElementById("bookingTime").value = "";
      document.getElementById("customerName").value = "";
      num -= 1;

      let queueCard = document.querySelector("#queueCard");
      let firstItem = queueCard?.querySelector(".queue-item");

      if(firstItem){
        firstItem.remove();

        let queueItems = document.querySelectorAll(".queue-item");
        queueItems.forEach((item, index) =>{
          let queueNumber = item.querySelector(".queue-number");
          queueNumber.textContent = index + 1;
        });

        num = queueItems.length;
      }
      else{
        alert("No booking available!");
      }
});

for(let i = 0 ; i < bookingLine.length ; i++){
  console.log(bookingLine[i]);
}
