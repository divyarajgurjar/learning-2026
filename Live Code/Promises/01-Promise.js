// Friend 1: Prashant
const prashant = new Promise((res, rej) => {
   setTimeout(()=> {
        rej("Tera Prashant bhai nhi aa rha hain")
    },2000)
});

// Friend 2: Abhishek
const abhishek = new Promise((res, rej) => {
     setTimeout(()=> {
        res("I'm coming")
    },3000)
});


Promise.race([prashant, abhishek])
  .then((value) => {
      console.log(value);
  })
  .catch((error) => {
      console.log("Pehle wale ne mana kar diya");
  });
  

