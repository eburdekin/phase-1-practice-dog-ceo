//Bringing this out to use in Challenge Four (global @ top)
const dogListContainer = document.querySelector('#dog-breeds')

//CHALLENGE ONE

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

fetch(imgUrl)
    .then(res => res.json())
    .then(renderAllDogImgs)

function renderAllDogImgs(dogs) {
    const dogList = dogs.message
    //Automatically passing an argument into the function, so don't need to provide an argument here when using it as a callback
    dogList.forEach(renderOneDog)
}

function renderOneDog(dog) {
    const dogImageDiv = document.querySelector('#dog-image-container')
    const newDog = document.createElement('img')
    newDog.src = dog
    dogImageDiv.append(newDog)
}

//CHALLENGE TWO

const breedUrl = "https://dog.ceo/api/breeds/list/all";
let dogBreedArray

fetch(breedUrl)
    .then(res => res.json())
    .then(renderDogList)

function renderDogList(dogObj){
    //Object keys will return an array
    dogBreedArray = Object.keys(dogObj.message)
    //Loop through the array that is returned by Object.keys
    dogBreedArray.forEach(addDog)
}

function addDog(dog){
    const newDogBreed = document.createElement('li')
    //ADD EVENT LISTENER WHILE I CREATE LI
    newDogBreed.addEventListener('click', turnRed)
    newDogBreed.className = 'dogbreedname'
    newDogBreed.style.color = "black"
    newDogBreed.textContent = dog;
    dogListContainer.appendChild(newDogBreed)
}

//CHALLENGE THREE

//Added event listener above while creating list item

function turnRed(e){
    if (e.target.style.color === "black") {
    e.target.style.color = "red"}
    else {
        e.target.style.color = "black"
    }
}

//CHALLENGE FOUR

//Add Javascript so user can filter breeds using dropdown in index.html
//Select dropdown from DOM
const dropdown = document.getElementById('breed-dropdown')
dropdown.addEventListener('change', filterBreeds)

function filterBreeds() {
    console.log(dropdown.value)
    dogListContainer.innerHTML = ''
    let newArray = dogBreedArray.filter(breedName => {
        if (breedName.startsWith(dropdown.value)) {
            return breedName
        }
})
    // for (filteredBreed of newArray){
    //     addDog(filteredBreed)
    // }
    newArray.forEach(filteredBreed => addDog(filteredBreed))
}

