console.log('Welcome to Magic Notes!')
let showNotes = () => {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    html = '';
    let elem = document.getElementById('notes');
    if (noteObj.length != 0) {
        noteObj.forEach((element, index) => {
            html +=
                `
        <div id='card${index}' class="card" style="width: 18rem;">
                <!-- <img src="..." class="card-img-top" alt="..."> -->
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" class="btn btn-primary" onclick = "deleteNote(this.id)">Delete</button>
                </div>
            </div>
        `
        });
        elem.innerHTML = html;
    }
    else {
        elem.innerHTML = `
        <h5>Nothing to show here.......... <br> Click Add Note to add a new note here.........</h5>
        `
    }
}
showNotes();
let addNotes = () => {
    let note = document.getElementById('addNote');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    noteObj.push(note.value)
    localStorage.setItem('notes', JSON.stringify(noteObj));
    note.value = "";
}
let deleteNote = (index) => {
    console.log(`I am deleting ${index} note.`);
    let elem = document.getElementById(`card${index}`)
    let notes = localStorage.getItem('notes');
    console.log(notes);
    noteObj = JSON.parse(notes)
    noteObj.splice(index, 1);
    console.log(noteObj);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    elem.remove();
    showNotes();
}
let search = document.getElementById('searchTxt');
search.addEventListener('input', function (element) {
    let searchVal = search.value.toLowerCase()
    // console.log(searchTxt)
    let searchElem = document.getElementsByClassName('card');
    Array.from(searchElem).forEach(element =>{
        let searchTxt = element.getElementsByTagName('p')[0].innerText.toLocaleLowerCase();
        console.log(searchTxt)
        if(searchTxt.includes(searchVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
    


})
console.log(search);

let btn = document.getElementById('addBtn');
// console.log(btn);
btn.onclick = () => {
    addNotes();
    showNotes();
}