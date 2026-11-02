(function(){
var btn=document.getElementById("menuBtn"),menu=document.getElementById("mobileMenu");
function setMenu(o){if(!btn||!menu)return;menu.hidden=!o;btn.setAttribute("aria-expanded",o?"true":"false");btn.setAttribute("aria-label",o?"Close menu":"Open menu")}
if(btn){btn.addEventListener("click",function(){setMenu(menu.hidden)});
menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
window.matchMedia("(min-width:901px)").addEventListener("change",function(){setMenu(false)})}
var main=document.getElementById("top"),docs=document.getElementById("docs");
function route(){
  var h=location.hash.slice(1),isDoc=(h==="privacy"||h==="terms");
  if(isDoc){main.hidden=true;docs.hidden=false;
    [].forEach.call(docs.querySelectorAll(".doc"),function(a){a.hidden=a.getAttribute("data-doc")!==h});
    document.title=(h==="privacy"?"Privacy Policy":"Terms of Use")+" | ModelFlow";window.scrollTo(0,0)}
  else{var was=main.hidden;main.hidden=false;docs.hidden=true;document.title="ModelFlow";
    if(was){var el=h&&document.getElementById(h);if(el)el.scrollIntoView();else window.scrollTo(0,0)}}
}
window.addEventListener("hashchange",route);route();
})();

(function(){var f=document.getElementById("contactForm"),s=document.getElementById("cfStatus");if(!f)return;
f.addEventListener("submit",function(e){e.preventDefault();
var n=f.name.value.trim(),m=f.email.value.trim(),q=f.query.value.trim();
if(!n||!/^\S+@\S+\.\S+$/.test(m)||!q){s.textContent="Enter your name, a valid email and your query.";return}
var body="Name: "+n+"\nEmail: "+m+"\n\n"+q;
s.textContent="Your email app should open with your message ready. If it does not, email info@modelflow.ae.";
window.location.href="mailto:info@modelflow.ae?subject="+encodeURIComponent("Website enquiry from "+n)+"&body="+encodeURIComponent(body)});
})();

(function(){var v=document.getElementById("heroVideo");if(!v)return;
// iOS and Android only autoplay inline, muted video: force those flags, then retry if the browser still blocks it
v.muted=true;v.defaultMuted=true;v.setAttribute("muted","");v.setAttribute("playsinline","");v.setAttribute("webkit-playsinline","");
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){v.removeAttribute("autoplay");v.pause();return}
function go(){var p=v.play();if(p&&p.catch)p.catch(function(){})}
go();v.addEventListener("loadeddata",go);v.addEventListener("canplay",go);
document.addEventListener("visibilitychange",function(){if(!document.hidden)go()});
// Low Power Mode and some in-app browsers hold autoplay until the first touch
["touchstart","pointerdown","scroll","click"].forEach(function(ev){window.addEventListener(ev,function(){if(v.paused)go()},{once:true,passive:true})});
})();
(function(){var b=document.getElementById("footMenuBtn"),f=document.getElementById("foot");if(!b||!f)return;
function set(o){f.classList.toggle("open",o);b.setAttribute("aria-expanded",o?"true":"false");b.setAttribute("aria-label",o?"Close footer menu":"Open footer menu")}
b.addEventListener("click",function(){set(!f.classList.contains("open"))});
document.getElementById("footLinks").addEventListener("click",function(e){if(e.target.closest("a"))set(false)});
})();
