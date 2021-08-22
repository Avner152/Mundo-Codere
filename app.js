// -- VARIABLES -- //

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
    // console.log(user + ' pushed');
  }
}

var userlist = new UserManager();


function getUserFromDoc(){
  var data = document.querySelectorAll('input')
  var type = ''
  
  if(userlist.users.length > 0)
    userlist.users = [];
  for (let i = 0; i < data.length; i+=2) {
    if(i < 10)
     type = 'Online'
    else if(i >= 10 && i < 20)
      type = 'Retail'
    else
      type = 'Omni'
    if(!data[i].value || !data[i+1].value){
      console.log('Row ' + eval( i/2+ 1) + ' Not Added!');
    }
    else
      userlist.addUser(new User(data[i].value, data[i+1].value, type));
  }

// console.log(userlist.users);

parent.style.display = 'block'

addTableDyn(userlist.users);
createJSONtextArea();
}

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

function createInputs(){
  var main_container = document.getElementsByClassName('container')[0];
  var input_son = document.getElementsByClassName('son')[0];
  var form_group =  document.getElementsByClassName('form-group')[0];

  for (let index = 0; index < 4; index++) {
    var form_brother = form_group.cloneNode(true);
    input_son.appendChild(form_brother)
  }
 
  var retail_brother = input_son.cloneNode(true);
  var omni_brother = input_son.cloneNode(true);

  retail_brother.childNodes[1].innerHTML = headers[1] + ': ';
  omni_brother.childNodes[1].innerHTML = headers[2] + ': ';

  main_container.appendChild(retail_brother);
  main_container.appendChild(omni_brother);

}

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
          console.log('iter');
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
