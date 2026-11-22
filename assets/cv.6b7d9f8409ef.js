document.addEventListener('DOMContentLoaded',function(){var links=document.querySelectorAll('.cv-index-link');if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){links.forEach(function(link){if(link.getAttribute('href')==='#'+entry.target.id){link.setAttribute('aria-current','location')}else{link.removeAttribute('aria-current')}})}})},{rootMargin:'-120px 0px -65% 0px',threshold:0});document.querySelectorAll('#cv-content>section').forEach(function(section){observer.observe(section)})}document.querySelectorAll('details a').forEach(function(link){link.addEventListener('click',function(){link.closest('details').open=false})})})

document.querySelector('#print-cv')?.addEventListener('click', () => window.print());

// Keep the native mobile navigation usable with the keyboard and outside clicks.
const cvMenu = document.querySelector('header details');
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && cvMenu?.open) {
    cvMenu.open = false;
    cvMenu.querySelector('summary')?.focus();
  }
});
document.addEventListener('click', event => {
  if (cvMenu?.open && !cvMenu.contains(event.target)) cvMenu.open = false;
});
