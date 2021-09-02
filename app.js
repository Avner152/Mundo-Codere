// -- VARIABLES -- //
// vars for inputs ->
var main_container = document.getElementsByClassName('container')[0];
var input_son = document.getElementsByClassName('son')[0];
var form_group = document.getElementsByClassName('form-group')[0];
var add_or_remove_container = document.getElementsByClassName('changes')[0];

var parent = document.getElementsByClassName('parent')[0];

//  Text Area & JSON
var ta = document.createElement('textarea');
ta.setAttribute('readonly', true);
var jsonHeader = document.createElement('h1');
jsonHeader.innerHTML = 'JSON:'
var json_btn_container = document.createElement('div');
// buttons for json file
var beautify = document.createElement('button');
var minify = document.createElement('button');
var cpy = document.createElement('button');
var download = document.createElement('button');

var snack = document.createElement('div');
snack.setAttribute('id', 'snackbar');
document.body.appendChild(snack)
var temp;

const headers = ['Online', 'Omni']
const CTAheaders = ['Registrate', 'Visitante', 'Sumate']

// Online?? yes -> where? -> headers[0] -> 0 -> CTA[0] -> Registrate

class User {
	constructor(img_type, img_link, cta_text, cta_link, start_date, end_date) {
		this.img_type = img_type;
		this.img_link = img_link;
    this.cta_text = cta_text
    this.cta_link = cta_link;
		this.start_date = start_date;
		this.end_date = end_date;
	}
}

class UserList {
	constructor(segment = "Unknown") {
		this.user_segment = segment;
		this.userlist = [];
	}
}

class UserManager {
	constructor() {
		this.users = [];
	}
}

var online_list = new UserList()
var omni_list = new UserList('Omni');
var userManager = new UserManager();

function setOnlineList() {
	return [
		new User('Online', 'ure'),
		new User('Online', ''),
		new User('Online', ''),
		new User('Omni', 'https://www.codere.es/OmniSplash/assets/Mobile_retail.jpg'),
		new User('Omni', ''),
	]
}

function setOmniList() {
	return [
		new User('Retail', ''),
		new User('Retail', ''),
		new User('Omni', ''),
		new User('Omni', 'https://www.codere.es/OmniSplash/images/online%20rulleta%20mobile.jpg'),
		new User('Online', ''),
	];
}

// This function takes info from inputs and revokes the table & json
// function doesn't return anything for now.

function getUserFromDoc() {
	var inputs = document.querySelectorAll('.img-link')
	var sons = document.querySelectorAll('.son');
	var dropdown = document.getElementsByName('dDown')

	var form_group, inputs_size, dates;
	var k = 0;
	var startDate, endDate, cta_text, cta_link;
	var show = 1;
	// Re-init after every attempt (click)
	if (userManager.users.length > 0)
		userManager.users = [];

	online_list.userlist = [];
	omni_list.userlist = [];

	data_in_input = findLengths();

	// create users from dropdown and 
	for (let i = 0; i < 2; i++) {
		inputs_size = sons[i].querySelectorAll('.img-link').length;
		for (let j = 0; j < inputs_size; j++) {
			form_group = sons[i].querySelectorAll('.draggable')[j];
			dates = form_group.querySelectorAll('.start.form-control, .end.form-control')
      dateElement = form_group.getElementsByClassName('form-control');

      cta_text = form_group.querySelector('.cta').value;
      cta_link = form_group.querySelector('.cta_link').value;
      
      startDate = endDate = 'None';

      if(dates.length == 1){
        if (dateElement[0].className.includes('start'))
          startDate = dates[0].value;
        else
          endDate = dates[0].value;
        }

			if (dates.length == 2) {
        startDate = dates[0].value;
        endDate = dates[1].value;
        
        console.log(startDate);
        console.log(endDate);

				var d1 = stringToDate(startDate)
				var d2 = stringToDate(endDate)

				if (d2 < d1) {
					dates[0].style.borderColor = 'red';
					show = 0;
					break;
				} else {
					dates[0].style.borderColor = '';
				}
			}
			if (!dropdown[k].value || !inputs[k].value) {} else {
				if (i == 0) {
					online_list.userlist.push(new User(dropdown[k].value, inputs[k].value, cta_text,cta_link, startDate, endDate));
				} else {
					omni_list.userlist.push(new User(dropdown[k].value, inputs[k].value, cta_text,cta_link, startDate, endDate));
				}
			}
			k++;
		}
	}

	if (show == 1) {
		parent.style.display = 'block'
		userManager.users = [online_list, omni_list]
		addTableDyn();
		createJSONtextArea();
	} else
		parent.style.display = 'none'


}

function stringToDate(dateString) {
	var y, m, d, h, i
	var splt = dateString.split(' ');
	var date = splt[0].split('/');
	var time = splt[1].split(':');

	y = date[2];
	m = date[1];
	d = date[0];

	h = time[0];
	i = time[1];
	return new Date(y, m, d, h, i);
}

function setAllInputs(action = true) {
	setOnlineInput(action);
	setOmniInput(action);
}

function setOnlineInput(action = true) { // true is Add | false is clear //
	temp = setOnlineList();
	var forms = document.querySelectorAll('.son')[0].querySelectorAll('.form-group');
	var option, date;

	if (action) {
		for (let i = 0, j = 0; i < forms.length; i += 2, j++) {
			option = forms[i].children[1].querySelectorAll('option')[0];

			option.innerHTML =
				option.value =
				temp[j].img_type;

			forms[i].querySelector('input').value = temp[j].img_link
		}
	} else {
		for (let i = 0; i < forms.length; i += 2) {
			option = forms[i].children[1].querySelectorAll('option')[0];
			date = forms[i].querySelectorAll('.form-control');
			// console.log(date[0] ? true:false);
			// console.log(date[1] ? true:false);
			if (date[0]) {
				date[0].value = ''
			}
			if (date[1]) {
				date[1].value = ''
			}
			option.innerHTML = option.value = forms[i].querySelector('input').value = ''
		}
	}
}

function setOmniInput(action = true) {
	var forms = document.querySelectorAll('.son')[1].querySelectorAll('.form-group');
	var option, date;

	temp = setOmniList();

	if (action) {
		for (let i = 0, j = 0; i < forms.length; i += 2, j++) {
			option = forms[i].children[1].querySelectorAll('option')[0];
			option.innerHTML = option.value = temp[j].img_type;
			forms[i].querySelector('input').value = temp[j].img_link

		}
	} else {
		for (let i = 0; i < forms.length; i += 2) {
			option = forms[i].children[1].querySelectorAll('option')[0];
			date = forms[i].querySelectorAll('.form-control');

			if (date[0]) {
				date[0].value = ''
			}
			if (date[1]) {
				date[1].value = ''
			}
			option.innerHTML = option.value = forms[i].querySelector('input').value = ''

		}
	}
}


// This function Creates TextArea with JSON data in it
// allowing to copy\beautify\minify thte JSON data
function createJSONtextArea() {
  ta.innerHTML = ''

	document.body.appendChild(jsonHeader);
	json_btn_container.setAttribute('class', 'json_btn_container')
	document.body.appendChild(json_btn_container);
	beautify.innerHTML = 'Beautify';
	minify.innerHTML = 'Minify';
	cpy.innerHTML = 'Copy Contect';
  download.innerHTML = 'Download json file'

	json_btn_container.appendChild(beautify);
	json_btn_container.appendChild(minify);
	json_btn_container.appendChild(cpy);
	json_btn_container.appendChild(download);
	var x = '';

	x = JSON.stringify(userManager);

	beautify.addEventListener('click', () => {
		x = JSON.stringify(userManager, null, 3)
		ta.innerHTML = x;
		snackbar('Beautified!');

	})

	minify.addEventListener('click', () => {
		x = JSON.stringify(userManager)
		ta.innerHTML = x;
		snackbar('Minified!');

	})

	cpy.addEventListener('click', () => {
		document.querySelector("textarea").select();
		document.execCommand('copy');
		snackbar('Copied!');
	})

  download.addEventListener('click', () =>{
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userManager, null, 3));

    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "mundosplash.json");
    dlAnchorElem.click();
  })

	ta.innerHTML = x;
	document.body.appendChild(ta);
}

function snackbar(msg) {
	var snack = document.getElementById("snackbar");
	snack.innerText = msg;
	snack.className = "show";
	setTimeout(function() {
		snack.className = snack.className.replace("show", "");
	}, 2400);
}

// The first step of this site - create Inputs Dynamiclly
function createInputs(num = 5) {
	for (let index = 0; index < num - 1; index++) {
		var form_brother = form_group.cloneNode(true);
		input_son.appendChild(form_brother)
	}

	// DUPLICATE SONS
	var omni_brother = input_son.cloneNode(true);
	omni_brother.setAttribute('class', 'son omni');

	// DUPLICATE BUTTONS 

	var add_rem_omni = add_or_remove_container.cloneNode(true);
	add_rem_omni.childNodes[1].setAttribute('onclick', "addInput('.son.omni')")
	add_rem_omni.childNodes[3].setAttribute('onclick', "removeInput('.son.omni')")
	add_rem_omni.setAttribute('class', 'changes omni');


	omni_brother.childNodes[1].innerHTML = headers[1] + ': ';

	main_container.appendChild(omni_brother);
	main_container.appendChild(add_rem_omni);

	makeItDraggable();
}

function addInput(class_str) {
	var son = document.querySelector(class_str)
	var f_group = son.childNodes[3];
	var form_brother = f_group.cloneNode(true);
  console.log(form_brother.querySelector('.start').style.borderColor);
	var control = form_brother.querySelectorAll('.form-control');
	form_brother.querySelector('input').value =
		form_brother.querySelector('option').value =
		form_brother.querySelector('option').innerHTML = '';
    console.log(form_brother.querySelectorAll('.start')[1]);

	if (control[0])
		form_brother.querySelectorAll('.form-control')[0].value = '';
	if (control[1])
		form_brother.querySelectorAll('.form-control')[1].value = '';


	son.appendChild(form_brother)
}

function removeInput(class_str) {
	var x = document.querySelectorAll(class_str)
	var len = x[0].childNodes.length - 1;
	if (len >= 9)
		x[0].childNodes[len].remove();
	else
		console.log('cannot delete less than 5 nodes');
}



// This function assists to let us know how many segments we hold in our list
function findLengths() {
	var lens = [0, 0, 0]
	var sons = document.getElementsByClassName('son');
	var groups = 0;
	for (let x = 0; x < sons.length; x++) {
		groups = sons[x].querySelectorAll('.form-group');
		for (let y = 0; y < groups.length / 2; y++) {
			if (!groups[y * 2].querySelector('.dDown').value || !groups[y * 2].querySelector('input').value) {} else {
				lens[x]++;
			}
		}
	}
	return lens;
}

function addTableDyn() {
	parent.innerHTML = '';
	var count = 0;
	var str;
	var iter = 0;

	lens = findLengths();

	while (count < 2) {
		iter = 0;

		if (lens[count] == 0) {
			// console.log('empty');
		} else {
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

				switch (k) {
					case 0:
						str = '#';
						break;
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

					switch (j) {
						case 0:
							numeric.innerHTML = eval(i + 1);
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
							img.style.width = '15vw';
							img.style.height = '20vw';
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

function makeItDraggable() {
	// Drag
	const draggables = document.querySelectorAll('.draggable')
	const containers = document.querySelectorAll('.son')
	draggables[0].draggable = false;
	draggables[5].draggable = false;
	// draggables[10].draggable = false;

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
			return {
				offset: offset,
				element: child
			}
		} else {
			return closest
		}
	}, {
		offset: Number.NEGATIVE_INFINITY
	}).element
}

function avner(target) {
	target.flatpickr({
		altInput: true,
		altFormat: "d/m/Y H:i",
		dateFormat: "Y-m-d",
		enableTime: true,
	});
}