//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink);

function getDrink(){
    if(document.querySelectorAll('.swiper-slide')!==null){
        document.querySelectorAll('.swiper-slide').forEach(e => e.remove());
    }
    const drink = document.querySelector('input').value;

    fetch("https://thecocktaildb.com/api/json/v1/1/search.php?s=" + drink)
        .then( res=> res.json())
        .then( data => { 
            console.log(data);
            if (data.drinks === null){
                 alert("Sorry! The Bartender is not familiar with that drink, please choose something else.");
            }
            else{
                data.drinks.forEach( cocktail => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    document.querySelector('.swiper-wrapper').append(slide);

                    const card = document.createElement('div');
                    card.className = 'drinkCard';
                    slide.appendChild(card);

                    const drinkName = document.createElement('h2');
                    drinkName.innerText = cocktail.strDrink;
                    card.appendChild(drinkName);

                    const drinkImage = document.createElement('img');
                    drinkImage.src = cocktail.strDrinkThumb;
                    card.appendChild(drinkImage);

                    const instructionsTitle = document.createElement('h3');
                    instructionsTitle.innerText = "Instructions";
                    card.appendChild(instructionsTitle);

                    const drinkInstructions = document.createElement('p');
                    drinkInstructions.innerText = cocktail.strInstructions.replace(/(\n|\r|\n\r)/gm,'');
                    card.appendChild(drinkInstructions);
                });
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });

    // document.querySelector('.swiper-slide').hidden = false;
}



