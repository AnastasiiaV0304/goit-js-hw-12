import{i,a as L,S}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const m=document.querySelector(".form"),p=document.querySelector(".gallery"),q=document.querySelector("div"),v=document.querySelector("input"),u=document.querySelector(".btn-load"),h=()=>{const e=document.createElement("span");e.classList.add("loader"),q.append(e)},a=()=>{const e=document.querySelector(".loader");e&&e.remove()},E=()=>{u.style.display="block"},l=()=>{u.style.display="none"};let d=1,g=15,y=" ",f;m.addEventListener("submit",async e=>{d=1,h(),p.innerHTML=" ",e.preventDefault();try{y=v.value;const r=await b();w(r),m.reset(),a(),E(),r.hits.length<15&&l(),r.hits.length===0&&(l(),i.error({message:"Sorry, there are no images matching <br>your search query. Please try again!</br>",position:"topRight"}))}catch{i.error({title:"Error"})}});u.addEventListener("click",async()=>{h();try{d+=1;const e=await b();w(e),a();const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),(p.children.length>=f||e.hits.length<g)&&(i.warning({message:"We are sorry, but you have reached the end of search results.",position:"bottomCenter"}),l())}catch{i.error({title:"Error"}),a()}});async function b(){try{const e="42271684-72e9093d4988315267462c0c1",r=new URLSearchParams({key:e,q:y,image_type:"photo",orientation:"horizontal",safesearch:!0,page:d,per_page:g}),n=await L.get(`https://pixabay.com/api/?${r}`);return f=n.data.totalHits,n.data}catch(e){throw console.log(e),WebTransportError}}function w(e){const r=e.hits.map(s=>`
            <li class="gallery-item"><a href="${s.largeImageURL}">
          <img class="gallery-image" src="${s.webformatURL}" alt="${s.tags}"></a>
          <p><b>Likes: </b>${s.likes}</p>
          <p><b>Views: </b>${s.views}</p>
          <p><b>Comments: </b>${s.comments}</p>
          <p><b>Downloads: </b>${s.downloads}</p>
          </li>`).join("");p.insertAdjacentHTML("beforeend",r),new S(".gallery a",{captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",fadeSpeed:150,captionSelector:"img",captionDelay:250}).on("show.simplelightbox").refresh(),a()}
//# sourceMappingURL=commonHelpers.js.map
