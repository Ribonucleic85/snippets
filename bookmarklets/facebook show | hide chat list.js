sel__ = q => document.querySelectorAll(q);
hidechat___ = x => sel__('.uiToggle')[sel__('.uiToggle').length-1].style.display=x;
Element.prototype.sa = (x,y) => this.setAttribute(x,y);
xi=[document.createElement('div'), document.createElement('input'), document.createElement('input')],
xi[0].setAttribute('style','position:fixed;top:5px;left:5px;z-index:10000;'),
xi[1].setAttribute('type','button'),
xi[2].setAttribute('type','button'),
xi[1].setAttribute('value','hide'),
xi[1].setAttribute('onclick','hidechat___("none");'),
xi[2].setAttribute('value','show'),
xi[2].setAttribute('onclick','hidechat___("");'),
xi[0].appendChild(xi[1]),
xi[0].appendChild(xi[2]),
document.body.appendChild(xi[0])
