const containerElement = document.getElementById("container");

const btnadd=document.getElementsByClassName("btn-add")[0];

function getAppStorage(){
    return JSON.parse(localStorage.getItem("Notes-app") || "[]");
}
getAppStorage().forEach(element => {
   const textElement= createTextelement(element.id, element.content)
   containerElement.insertBefore(textElement,btnadd);
});
function createTextelement(id, content){
    const textElement = document.createElement('textarea');
    textElement.classList.add('sticky');
    textElement.value=content;
    textElement.placeholder="Enter your notes"
    textElement.addEventListener("change",()=>{
        updateNotes(id, textElement.value)
    });
    textElement.addEventListener("dblclick",()=>{
        const check=confirm("Are You Sure to Delete ?");
        if(check){
          deleteNotes(id,textElement);
        }
      });
    return textElement;
}
// Add new notes
function addSticky(){
    const notes= getAppStorage();
    const notesobj = {id:Math.floor(Math.random()*100000),content:""}
   const textElement= createTextelement(notesobj.id, notesobj.content);
   containerElement.insertBefore(textElement,btnadd);
   notes.push(notesobj);
   saveNotes(notes);
}

btnadd.addEventListener('click',()=>addSticky());

function saveNotes(notes){
    localStorage.setItem("Notes-app", JSON.stringify(notes));
}
//Update notes
function updateNotes(id, content){
    const notes=getAppStorage();
    const updateElement = notes.filter((note)=>note.id==id)[0];
    updateElement.content=content;
    saveNotes(notes);
}
function deleteNotes(id,textElement){
    const notes=getAppStorage().filter((note)=>note.id!=id);
    saveNotes(notes);
    containerElement.removeChild(textElement);
  }