// 中文轉換
var zhconvert = document.getElementById("zh-convert");
zhconvert.onclick = function() {
  if (zhconvert.dataset.zh == "tw") {
    TongWen.trans2Simp(document);
    zhconvert.dataset.zh = "cn";
    setTimeout(function() {zhconvert.textContent = "繁體";}, 500);
  } else {
    TongWen.trans2Trad(document);
    zhconvert.dataset.zh = "tw";
    setTimeout(function() {zhconvert.textContent = "简体";}, 500);
  }
}

// 字體放大
var fl = document.getElementById("font-larger");
fl.onclick = function() {
  var contents = document.querySelectorAll(".main-content");
  for (var i = 0; i < contents.length; i++) {
    var content = contents[i];
    if (content.style.fontSize == "") {
      content.style.fontSize = "1.0em";
    }
    content.style.fontSize = (parseFloat(content.style.fontSize) + 0.25) + "em";
  }
}

// 字體縮小
var fs = document.getElementById("font-smaller");
fs.onclick = function() {
  var contents = document.querySelectorAll(".main-content");
  for (var i = 0; i < contents.length; i++) {
    var content = contents[i];
    if (content.style.fontSize == "") {
      content.style.fontSize = "1.0em";
    }
    content.style.fontSize = (parseFloat(content.style.fontSize) - 0.25) + "em";
  }
}

// 在單詞上顯示解釋
// indicate if the mouse cursor is in the tooltip
var isCursorInTooltip = false;

// when cursor leaves the text, the delay time to close the tooltip if the
// cursor is not in the tooltip. (milisecond)
var delay = 250;

// create and append invisible tooltip to DOM tree
var tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
tooltip.classList.add("invisible");
tooltip.addEventListener("mouseenter", function() {
  isCursorInTooltip = true;
});
tooltip.addEventListener("mouseleave", function() {
  isCursorInTooltip = false;
  tooltip.classList.add("invisible");
});
document.querySelector("body").appendChild(tooltip);

// event handler for mouseenter event of italic text
function ShowTooltip(e) {
  var elm = e.target;
  var key = elm.textContent;
  if (notes.hasOwnProperty(key)) {
    tooltip.textContent = notes[key];
    tooltip.style.left = elm.getBoundingClientRect().left + window.pageXOffset + 'px';
    tooltip.style.top = (elm.getBoundingClientRect().top + window.pageYOffset + elm.offsetHeight + 5) + 'px';
    tooltip.classList.remove("invisible");
  }
}

// event handler for mouseleave event of italic text
function HideTooltip(e) {
  setTimeout(function() {
    if (!isCursorInTooltip) {
      tooltip.classList.add("invisible");
    }
  }, delay);
}

// select all bold texts and attach mouseenter and mouseleave event handler
function SetupNotes() {
  var strongs = document.querySelectorAll("strong");
  for (var i = 0; i < strongs.length; ++i) {
    var strong = strongs[i];
    strong.addEventListener("mouseenter", ShowTooltip);
    strong.addEventListener("mouseleave", HideTooltip);
  }
}

// 對讀
var tables = document.getElementsByClassName("contrast-reading-table");
var trs = tables[0].getElementsByTagName("tr");
var show = document.getElementById("option-contrast-reading");

function createInputCheck() {
	for (var i=0; i< trs.length; i++) {
		var th = trs[i].getElementsByTagName("td")[0];

		var input = document.createElement("input");
		input.type = "checkbox";
		input.className = "contrast-reading-checkbox";
		if (i < 3)  {
			input.checked = "checked";
		}
		input.onchange = inputCheckChange;
		show.appendChild(input);

		var span = document.createElement("span");
		span.innerHTML = th.innerHTML
		show.appendChild(span);
		show.appendChild(document.createElement("br"));
	}
	show.appendChild(document.createElement("br"));
}

function createCRTableHeading(crTable) {
	// table heading
	var tRow = document.createElement("tr");
	var checkboxs = document.getElementsByClassName("contrast-reading-checkbox");
	for (var i = 0; i < trs.length; i++) {
		if (!checkboxs[i].checked) {continue;}
		var th = trs[i].getElementsByTagName("td")[0];
		var crTH = document.createElement("th");
		crTH.innerHTML = th.innerHTML;
		tRow.appendChild(crTH);
	};
	crTable.appendChild(tRow);
}

function createCRTableContent(crTable) {
	// table td
	var checkboxs = document.getElementsByClassName("contrast-reading-checkbox");
	for (var i = 0; i < tables.length; i++) {
		var tRow = document.createElement("tr");
		var trs = tables[i].getElementsByTagName("tr");
		for (var j = 0; j < trs.length; j++) {
			if (!checkboxs[j].checked) {continue;}
			tRow.appendChild(trs[j].getElementsByTagName("td")[1].cloneNode(true));
		};
		crTable.appendChild(tRow);
	};
}

var crtable = document.createElement("table");
createInputCheck();
createCRTableHeading(crtable);
createCRTableContent(crtable);
show.appendChild(crtable);
SetupNotes();

function inputCheckChange() {
	show.removeChild(crtable);
	crtable.innerHTML = "";
	createCRTableHeading(crtable);
	createCRTableContent(crtable);
	show.appendChild(crtable);
	SetupNotes();
}
