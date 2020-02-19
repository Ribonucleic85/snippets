window.onbeforeunload = () => ' ';

byId = x => document.getElementById(x);

handleEvt = e => e.preventDefault();

onDrop = evt => {
	evt.stopPropagation();
	handleEvt(evt);
	onDragDone(evt);
	var imageUrl = evt.dataTransfer.getData("URL");
	imageUrl.addfn(selct.value(byId("addmode")));
};

onDragDone = evt => {
	handleEvt(evt);
	dropbox.style.background = "";
};

onDragOver = evt => {
	handleEvt(evt);
	dropbox.style.background = "#00e80080";
};

dragAreaDisplay = () => {
	dropbox.style.display = dropbox.style.display=="none"? "": "none";
};

String.prototype.addfn = function(sw) {
	switch(sw) {
		case "zero": this.addszero(); break;
		case "norm": this.addn(); break;
		case "chop": this.addchop(); break;
		case "s0": this.add(); break;
		default: (()=>{
			dropbox.style.background = "#ff000080";
			dragAreaDisplay();
			setTimeout(()=>{ dragAreaDisplay(); }, 3000);
		})()
	}
};

String.prototype.addchop = function() {
	var i = document.createElement('img')
	,   str = this;
	if (str.lastIndexOf("?")!=-1)
		str = str.substring(0, str.lastIndexOf("?"));
	if (str.lastIndexOf("#")!=-1)
		str = str.substring(0, str.lastIndexOf("#"));
	i.src = str;
	document.body.appendChild(i);
};

String.prototype.addn = function() {
	var i = document.createElement('img');
	i.src = this;
	document.body.appendChild(i);
};

String.prototype.add = function() {
	var i = document.createElement('img')
	,   str = this;
	i.src = str.substring(0,
		str.substring(0, str.lastIndexOf("/")).lastIndexOf("/")+1)
		+"s0" +
		str.substring(str.length, str.lastIndexOf("/")
	);
	document.body.appendChild(i);
};

String.prototype.addszero = function() {
	var i = document.createElement('img')
	,   str = this;
	i.src = str.substring(0,
		str.lastIndexOf("/")+1)
		+"s0/"+
		str.substring(str.lastIndexOf("/")+1, str.length
	);
	document.body.appendChild(i);
};

el = {};
	el.cr     = n       => document.createElement(n);
	el.text   = (e,t)   => e.appendChild(document.createTextNode(t));
	el.att    = (e,a,v) => e.setAttribute(a,v);
	el.bodap  = e       => document.body.appendChild(e);
	el.app    = (p,e)   => p.appendChild(e);
	el.selimg = ()      => document.images[ selct.value(byId("imgsel")) ];
	el.rembod = e       => document.body.removeChild(e);
	el.reme   = e       => e.parentNode.removeChild(document.images[selct.value(byId("imgsel"))]);


selct = {};
	selct.index  = t => t.selectedIndex;
	selct.value  = t => t.options[t.selectedIndex].value;
	selct.text   = t => t.options[t.selectedIndex].innerHTML;
	selct.addopt = (dd,val,html) => {
		var o = document.createElement("option");
		o.value = val;
		o.innerHTML = html;
		dd.add(o);
	};

addmode = n => selct.value(byId("addmode"));

imgres = function(n) {
	if (selct.value(byId("imgsel"))==-1)
		return;
	if (byId("imgwidth").checked) {
		document.images[selct.value(byId("imgsel"))].style.width = n+"px";
		document.images[selct.value(byId("imgsel"))].style.height = "";
	};
	if (byId("imgheight").checked) {
		document.images[selct.value(byId("imgsel"))].style.height = n+"px";
		document.images[selct.value(byId("imgsel"))].style.width = "";
	};
	markimg(false);
};

imgrot = function(n) {
	if (selct.value(byId("imgsel"))==-1)
		return;
	document.images[selct.value(byId("imgsel"))].style.transform = "rotate(" +n+ "deg)";
	markimg(false);
};

markimg = function(u) {
	if (selct.value(byId("imgsel"))==-1)
		return;
	if (!u)
		document.images[selct.value(byId("imgsel"))].style.border = "";
	else
		document.images[selct.value(byId("imgsel"))].style.border = "10px solid green";
};

unmarkimg = function(u) {
	for (u=0; u<document.images.length; u++)
		document.images[u].style.border = "";
};

doOpts = function() {
	selct.addopt(imgsel, "-1", "deselect");
	for (var i=0; i<document.images.length; i++)
		selct.addopt(imgsel, i, "image "+(i+1));
};

undoOpts = function() {
	while (imgsel.options.length) imgsel.remove(imgsel.options[0]);
};

trans = (e,o) => e.style.opacity=o;



rszcon = el.cr("div");
 el.att(rszcon, "id", "resizercon");
 el.att(rszcon, "style", "position:fixed; top:0px; right:0px; background-color:white; height:22px; z-index:999999;");
 el.att(rszcon, "onmouseover", "trans(this,1)");
 el.att(rszcon, "onmouseout", "trans(this,0)");

label = [el.cr("label"), el.cr("label")];
 el.text(label[0], "height");
 el.text(label[1], "width");

radin = [el.cr("input"), el.cr("input")];
 el.att(radin[0], "type", "radio");
 el.att(radin[1], "type", "radio");
 el.att(radin[0], "value", "height");
 el.att(radin[1], "value", "width");
 el.att(radin[0], "id", "imgheight");
 el.att(radin[1], "id", "imgwidth");
 el.att(radin[0], "name", "imgsize");
 el.att(radin[1], "name", "imgsize");

num = el.cr("input");
 el.att(num, "type", "text");
 el.att(num, "value", "1000");
 el.att(num, "style", "width:55px");
 el.att(num, "id", "imgnum");

aply = el.cr("input");
 el.att(aply, "type", "button");
 el.att(aply, "value", "resize");
 el.att(aply, "onclick", "imgres(byId('imgnum').value);");

unsel = el.cr("input");
 el.att(unsel, "type", "button");
 el.att(unsel, "value", "x");
 el.att(unsel, "onclick", "undoOpts();doOpts()");

imgsel = el.cr("select");
 el.att(imgsel, "id", "imgsel");
 el.att(imgsel, "onchange", "unmarkimg(),markimg(true)");

rotbr = el.cr("br");

rotnum = el.cr("input");
 el.att(rotnum, "type", "text");
 el.att(rotnum, "value", "0");
 el.att(rotnum, "style", "width:55px");
 el.att(rotnum, "id", "rotnum");

rotaply = el.cr("input");
 el.att(rotaply, "type", "button");
 el.att(rotaply, "value", "rotate");
 el.att(rotaply, "onclick", "imgrot(byId('rotnum').value);");

remimg = el.cr("input");
 el.att(remimg, "type", "button");
 el.att(remimg, "value", "remove");
 el.att(remimg, "onclick", "el.reme(el.selimg());");

dropbu = el.cr("input");
 el.att(dropbu, "type", "button");
 el.att(dropbu, "value", "drag on/off");
 el.att(dropbu, "onclick", "dragAreaDisplay()");



con = el.cr('div');
 el.att(con, "style", "position:fixed; top:0px; left:0px; z-index:999999;");
 el.att(con, "onmouseover", "trans(this,1)");
 el.att(con, "onmouseout", "trans(this,0)");

ta = el.cr('input');
 el.att(ta, "id", "image");
 el.att(ta, "type", "text");

buvar = el.cr('input');
 el.att(buvar, "type", "button");
 el.att(buvar, "value", "add");
 el.att(buvar, "onclick", "byId('image').value.addfn(selct.value(byId('addmode'))); byId('image').value=''");

add_mode = el.cr('select');
  el.att(add_mode, "id", "addmode");
  selct.addopt(add_mode, "norm", "normal (url untouched)");
  selct.addopt(add_mode, "zero", "s0 (when no s#)");
  selct.addopt(add_mode, "s0",   "s0 (change s#)");
  selct.addopt(add_mode, "chop", "# and ?");


dropbox = el.cr("div");
 el.att(dropbox, "style", "position:fixed; top:0px; left:0px; height:100%; width:100%; z-index:999998");

el.bodap(rszcon);
el.bodap(con);
el.bodap(dropbox);
el.app(rszcon, label[0]);
el.app(rszcon, label[1]);
el.app(label[0], radin[0]);
el.app(label[1], radin[1]);
el.app(rszcon, num);
el.app(rszcon, unsel);
el.app(rszcon, imgsel);
doOpts();
el.app(rszcon, aply);
el.app(rszcon, rotbr);
el.app(rszcon, rotnum);
el.app(rszcon, rotaply);
el.app(rszcon, remimg);
el.app(rszcon, dropbu);
el.app(con, ta);
el.app(con, buvar);
el.app(con, add_mode);
radin[0].checked = true;
dropboxEvt = [
	dropbox.addEventListener("drop", onDrop),
	dropbox.addEventListener("dragover", onDragOver, false),
	dropbox.addEventListener("dragleave", onDragDone, false)
];
