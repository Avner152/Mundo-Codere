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
var temp;

const headers = ['Online', 'Retail', 'Omni']
const CTAheaders = ['Registrate', 'Visitante', 'Sumate']

// Online?? yes -> where? -> headers[0] -> 0 -> CTA[0] -> Registrate
// Retail -> ..... ->Vistante

class User{
  constructor(img_type, img_link){
    this.img_type = img_type;
    this.img_link = img_link;
  }
}

class UserList{
  constructor(segment = "Online"){
    this.user_segment = segment;
    this.userlist = [];
  }
}

class UserManager{
  constructor(){
    this.users = [];
  }
}

var online_list = new UserList()
var retail_list = new UserList('Retail')
var omni_list = new UserList('Omni');
// var online_list = setOnlineList();
// var retail_list = setRetailList();
// var omni_list = setOmniList();

var userManager = new UserManager();


function setOnlineList(){
  return [
    new User('Online', 'ure'),
    new User('Online', 'dikla'),
    new User('Online', ''),
    new User('Omni', 'שדג'),
    new User('Omni', ''),
    ]
}

function setRetailList(){
  return [
    new User('Retail', ''),
    new User('Retail', ''),
    new User('Omni', ''),
    new User('Omni', '13'),
    new User('Online', ''),
    ];
}

function setOmniList(){
  return [
    new User('Omni', ''),
    new User('Omni', 'dsa'),
    new User('Omni', ''),
    new User('Retail', ''),
    new User('Online', 'asd'),
    ];
}

// This function takes info from inputs and revokes the table & json
// function doesn't return anything for now.

function getUserFromDoc(){
  var inputs = document.querySelectorAll('input')
  var sons = document.querySelectorAll('.son');
  var dropdown = document.getElementsByName('dDown')
  var inputs_size;
  var k = 0;
  
  // Re-init after every attempt (click)
  if(userManager.users.length > 0)
      userManager.users = [];
  online_list.userlist =[];
  retail_list.userlist = [];
  omni_list.userlist = [];

  data_in_input = findLengths();
  // create users from dropdown and 

  for (let i = 0; i < 3; i++) {
    inputs_size = sons[i].querySelectorAll('input').length;
    for (let j = 0; j < inputs_size; j++) {
      if(!dropdown[k].value || !inputs[k].value)
        {}
      else{          
        // console.log('k = ' + k);
          if(i == 0){
            online_list.userlist.push(new User(dropdown[k].value, inputs[k].value));
            // console.log('in: 0');
          }
          else if(i == 1)
          {  
          retail_list.userlist.push(new User(dropdown[k].value, inputs[k].value));
          // console.log('in 1');
        }
          else{
            omni_list.userlist.push(new User(dropdown[k].value, inputs[k].value));
            console.log('done');
            // console.log('in 2');
          }
        }
        k++;
    }

  }

  
  parent.style.display = 'block'

userManager.users = [online_list, retail_list, omni_list]
addTableDyn();
createJSONtextArea();
}

function setAllInputs(action = true){
  setOnlineInput(action);
  setRetailInput(action);
  setOmniInput(action);
}

function setOnlineInput(action = true){ // true is Add | false is clear //
   temp = setOnlineList();
  var forms = document.querySelectorAll('.son')[0].querySelectorAll('.form-group');
  // console.log(forms);
  if(action){
  for(let i = 0, j = 0; i < forms.length; i+=2, j++){
    forms[i].children[1].querySelectorAll('option')[0].innerHTML = 
    forms[i].children[1].querySelectorAll('option')[0].value = 
    temp[j].img_type;
    forms[i].querySelector('input').value = temp[j].img_link
    }
  }
  else{
    for(let i = 0; i < forms.length; i+=2){
      forms[i].children[1].querySelectorAll('option')[0].innerHTML = 
      forms[i].children[1].querySelectorAll('option')[0].value = 
      '';
      forms[i].querySelector('input').value = ''
      }
  }
}
function setRetailInput(action = true){
  temp = setRetailList();
  var forms = document.querySelectorAll('.son')[1].querySelectorAll('.form-group');
  if(action){
  for(let i = 0, j = 0; i < forms.length; i+=2, j++){
    forms[i].children[1].querySelectorAll('option')[0].innerHTML = 
    forms[i].children[1].querySelectorAll('option')[0].value = 
    temp[j].img_type;
    forms[i].querySelector('input').value = temp[j].img_link

    }
  }
  else{
    for(let i = 0; i < forms.length; i+=2){
      forms[i].children[1].querySelectorAll('option')[0].innerHTML = 
      forms[i].children[1].querySelectorAll('option')[0].value = 
      '';
      forms[i].querySelector('input').value = ''

      }
  }
}

function setOmniInput(action = true){
  temp = setOmniList();
  var forms = document.querySelectorAll('.son')[2].querySelectorAll('.form-group');

  if(action){
  for(let i = 0, j = 0; i < forms.length; i+=2, j++){
    forms[i].children[1].querySelectorAll('option')[0].innerHTML = 
    forms[i].children[1].querySelectorAll('option')[0].value = 
    temp[j].img_type;
    forms[i].querySelector('input').value = temp[j].img_link
     }
  }
  else{
    for(let i = 0; i < forms.length; i+=2){
      forms[i].children[1].querySelectorAll('option')[0].innerHTML = 
      forms[i].children[1].querySelectorAll('option')[0].value = 
      '';
      forms[i].querySelector('input').value = ''
      }
  }
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

x = JSON.stringify(userManager);

beautify.addEventListener('click', () =>{
  x = JSON.stringify(userManager, null, 3)
  ta.innerHTML = x;
  snackbar('Beautified!');

})
  
minify.addEventListener('click', () =>{
  x = JSON.stringify(userManager)
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
  var form_brother = f_group.cloneNode(true);

  form_brother.querySelector('input').value =
   form_brother.querySelector('option').value =
   form_brother.querySelector('option').innerHTML = 
   ''
  son.appendChild(form_brother)
}
function removeInput(class_str){
  var x = document.querySelectorAll(class_str)
  var len = x[0].childNodes.length-1;
  if(len >= 9 )
   x[0].childNodes[len].remove();
  else
    console.log('cannot delete less than 5 nodes');
  }



// This function assists to let us know how many segments we hold in our list
function findLengths(){
  var lens = [0,0,0]
  var sons = document.getElementsByClassName('son');
  var groups = 0;
  for(let x = 0; x < sons.length; x++){
    groups = sons[x].querySelectorAll('.form-group');
    for(let y = 0; y < groups.length/2; y++){
      if(!groups[y*2].querySelector('.dDown').value || !groups[y*2].querySelector('input').value)
        {}
      else{
        lens[x]++;
      }
    }
  }
  return lens;
}

function addTableDyn(){
  parent.innerHTML = '';
  var count = 0;
  var str;
  var iter = 0;

  lens = findLengths();

  while (count < 3){
    iter = 0;

  if(lens[count] == 0){
    // console.log('empty');
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
              img_col.innerHTML = userManager.users[count].userlist[iter].img_type;
              cell.appendChild(img_col);
              break;
              case 2:
                link_col.innerHTML = userManager.users[count].userlist[iter].img_link;
                cell.appendChild(link_col);
                break;
              case 3:
              var img = new Image();
              img.style.width = '5vw';
              img.style.height = '5vw';
              img.src = userManager.users[count].userlist[iter].img_link;
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
// console.log(draggables);

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
