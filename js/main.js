var nameinput = document.getElementById('bookmarkName')
var Urlinput = document.getElementById('bookmarkUrl')

var bookmarks = []
if(localStorage.getItem("bookmarks")){
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    console.log(bookmarks)
    display()
}
function addbookmark(){
    var bookmark = {
        name: nameinput.value,
        url : Urlinput.value,

    }
    console.log(isValidUrl(Urlinput.value));
    if (isValidUrl(Urlinput.value)) {
     
        bookmarks.push(bookmark)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        display()
        document.getElementById('bookmarkName').value = null;
        document.getElementById('bookmarkUrl').value = null;
    }else{
  
      let  element = document.getElementById('bookmarkUrl')
      element.classList.add("is-invalid");

    }
   
    
}

function display(){
    var temp = ""
    for (let i = 0; i < bookmarks.length; i++) {
        temp+=`  <tr>
                  <td>`+i+`</td>
                  <td>`+bookmarks[i].name+`</td>              
                   <td>
                    <button class="btn btn-visit"  onclick="vis(`+i+`)">
                      <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-danger pe-2" onclick="del(`+i+`)" >
                      <i class="fa-solid fa-trash-can"></i>
                      Delete
                    </button>
                  </td>
              </tr>`
        
    }
    document.getElementById('tableContent').innerHTML=temp;
}

function del(i){
    bookmarks.splice(i,1)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    display()
}
function vis(i) {
   let url= bookmarks[i].url;
window.open(url,"_blank")
   
}
function isValidUrl(string) {
    const pattern = new RegExp(
        '^([a-zA-Z]+:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );
      return pattern.test(string);
  }