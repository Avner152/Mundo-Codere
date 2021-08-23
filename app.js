// -- VARIABLES -- //
// vars for inputs ->
var main_container = document.getElementsByClassName('container')[0];
var input_son = document.getElementsByClassName('son')[0];
var form_group = document.getElementsByClassName('form-group')[0];
var add_or_remove_container = document.getElementsByClassName('changes')[0];

var parent = document.getElementsByClassName('parent')[0];
var ta = document.createElement('textarea');
ta.setAttribute('readonly', true);
var jsonHeader = document.createElement('h1');
jsonHeader.innerHTML = 'JSON:'
var json_btn_container = document.createElement('div');
var beautify = document.createElement('button');
var minify = document.createElement('button');
var cpy = document.createElement('button');
var snack = document.createElement('div');
snack.setAttribute('id', 'snackbar');
document.body.appendChild(snack)



const headers = ['Online', 'Retail', 'Omni']
class User{
  constructor(img_type, img_link, user_segment = 'Online'){
    this.user_segment = user_segment;
    this.img_type = img_type;
    this.img_link = img_link;
  }
}

class UserManager{
  constructor(){
    this.users = [];
  }

   addUser(user){
    this.users.push(user);
  }
}

var userlist = new UserManager();

// This function takes info from inputs and revokes the table & json
// function doesn't return anything for now.
function getUserFromDoc(){
  var inputs = document.querySelectorAll('input') 
  var dropdown = document.getElementsByName('dDown')
  var type = ''
  var k = 0;

  var input_lens = []
  for(let i = 0,j = 0; i < 5; i+=2, j++){
    input_lens[j] = main_container.children[i].querySelectorAll('div').length/2
  }  

  // Re-init after every attempt (click)
  if(userlist.users.length > 0)
    userlist.users = [];

  // create users from dropdown and input
  for (let i = 0; i < input_lens.length; i++) {
    type = headers[i];
    for (let j = 0; j < input_lens[i]; j++) {
      if(!dropdown[k].value || !inputs[k].value)
        k++;
      else{
        userlist.addUser(new User(dropdown[k].value, inputs[k].value, type));
        k++;
      }
    }
  }

parent.style.display = 'block'

addTableDyn();
createJSONtextArea();
}

// This function Creates TextArea with JSON data in it
// allowing to copy\beautify\minify thte JSON data
function createJSONtextArea(){
ta.innerHTML = ''

document.body.appendChild(jsonHeader);
json_btn_container.setAttribute('class','json_btn_container')
document.body.appendChild(json_btn_container);
beautify.innerHTML = 'Beautify';
minify.innerHTML = 'Minify';
cpy.innerHTML = 'Copy Contect';

json_btn_container.appendChild(beautify);
json_btn_container.appendChild(minify);
json_btn_container.appendChild(cpy);
var x = '';

x = JSON.stringify(userlist);

beautify.addEventListener('click', () =>{
  x = JSON.stringify(userlist, null, 3)
  ta.innerHTML = x;
  snackbar('Beautified!');

})
  
minify.addEventListener('click', () =>{
  x = JSON.stringify(userlist)
  ta.innerHTML = x;
  snackbar('Minified!');

})

cpy.addEventListener('click', () =>{
  document.querySelector("textarea").select();
  document.execCommand('copy');
  snackbar('Copied!');
})

ta.innerHTML = x;
document.body.appendChild(ta);  
}

function snackbar(msg) {
  var snack = document.getElementById("snackbar");
  snack.innerText = msg;
  snack.className = "show";
  setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 2400);
}

// The first step of this site - create Inputs Dynamiclly
function createInputs(num = 5){  
  for (let index = 0; index < num-1; index++) {
    var form_brother = form_group.cloneNode(true);
    input_son.appendChild(form_brother)
  }
 
  // DUPLICATE SONS
  var retail_brother = input_son.cloneNode(true);
  retail_brother.setAttribute('class', 'son retail');
  var omni_brother = input_son.cloneNode(true);
  omni_brother.setAttribute('class', 'son omni');

  // DUPLICATE BUTTONS 
  var add_rem_retail = add_or_remove_container.cloneNode(true);
  add_rem_retail.setAttribute('class', 'changes reatil');
  add_rem_retail.childNodes[1].setAttribute('onclick', "addInput('.son.retail')")
  add_rem_retail.childNodes[3].setAttribute('onclick', "removeInput('.son.retail')")
  // console.log(add_rem_retail.childNodes[]);
 
  var add_rem_omni = add_or_remove_container.cloneNode(true);
  add_rem_omni.childNodes[1].setAttribute('onclick', "addInput('.son.omni')")
  add_rem_omni.childNodes[3].setAttribute('onclick', "removeInput('.son.omni')")
  add_rem_omni.setAttribute('class', 'changes omni');

 
  retail_brother.childNodes[1].innerHTML = headers[1] + ': ';
  omni_brother.childNodes[1].innerHTML = headers[2] + ': ';

  main_container.appendChild(retail_brother);
  main_container.appendChild(add_rem_retail);
  main_container.appendChild(omni_brother);
  main_container.appendChild(add_rem_omni);

  makeItDraggable();
}

function addInput(class_str){
  var son = document.querySelector(class_str)
  var f_group = son.childNodes[3];
  console.log(f_group);
  
  var form_brother = f_group.cloneNode(true);
  form_brother.querySelector('input').value = ''
  son.appendChild(form_brother)
}
function removeInput(class_str){
  var x = document.querySelectorAll(class_str)
  var len = x[0].childNodes.length-1;
  console.log(len);
  if(len >= 9 )
   x[0].childNodes[len].remove();
  else
    console.log('cannot delete less than 5 nodes');
  }



// This function assists to let us know how many segments we hold in our list
function findLengths(){
  lens = [0,0,0];
  
  userlist.users.forEach(user => {
    if(!user.user_segment.localeCompare('Online'))
      lens[0]++;
    else if(!user.user_segment.localeCompare('Retail'))
      lens[1]++;
    else if(!user.user_segment.localeCompare('Omni'))
      lens[2]++;
    else
      console.log('No match!');
  });
  return lens;
}

function addTableDyn(){
  parent.innerHTML = '';
  var count = 0;
  var str;
  var iter = 0;

  lens = findLengths();

  while (count < 3){
  
  if(lens[count] == 0){
    console.log('empty');
  }
  else{
  var div_element = document.createElement('div');  
  div_element.setAttribute('class', 'my_table')

  var header = document.createElement('h1');
  header.innerHTML = headers[count] + ':';

  div_element.appendChild(header);

  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
     
   var row = document.createElement("tr");
   row.setAttribute("class", "rows")

     for (let k = 0; k < 4; k++) {
       var headCell = document.createElement("td");
       var text = document.createElement('h3');

       switch (k){
         case 0:
             str = '#';                   
             break ;
         case 1:
             str = 'Image Type';
             break;
         case 2:
             str = 'Image Link'
             break;
        case 3:
             str = 'Preview'
             break;
     }
     text.innerHTML = str;
     headCell.appendChild(text);
     row.appendChild(headCell);

   }
   tblBody.appendChild(row);
   
    for (var i = 0; i < lens[count]; i++) {
        var row = document.createElement("tr");
          row.setAttribute("class", "rows")
        for (var j = 0; j < 4; j++) {
          var cell = document.createElement("td");         
          var numeric = document.createElement('h4');
          var img_col = document.createElement('h4');
          var link_col = document.createElement('h4');
          
          switch(j){
            case 0:
              numeric.innerHTML = eval(i+1);
              cell.appendChild(numeric);
              break;
            case 1:
              img_col.innerHTML = userlist.users[iter].img_type;
              cell.appendChild(img_col);
              break;
              case 2:
                link_col.innerHTML = userlist.users[iter].img_link;
                cell.appendChild(link_col);
                break;
              case 3:
              var img = new Image();
              img.style.width = '5vw';
              img.style.height = '5vw';
              img.src = userlist.users[iter].img_link;
              
              cell.appendChild(img);
              iter++;
              break;
            
            default:
              console.log("Error!");
            
          }

          row.appendChild(cell);
          cell.setAttribute("ClassName", 'cell')
          
        }
    
        tblBody.appendChild(row);
        }
    
      tbl.appendChild(tblBody);
      div_element.appendChild(tbl);
      tbl.setAttribute("border", "1");
      parent.appendChild(div_element);
    }
    count++;

    }
  }

function makeItDraggable(){
// Drag
const draggables = document.querySelectorAll('.draggable')
const  containers =  document.querySelectorAll('.son')
draggables[0].draggable = false;
draggables[5].draggable = false;
draggables[10].draggable = false;

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})
console.log(draggables);

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
