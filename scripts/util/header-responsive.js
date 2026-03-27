import { counter } from "../data/cart.js";

export function headerActive() {
  const hamburger = document.querySelector('.hamburger-menu img');

  if (!hamburger) return;
 
  hamburger.addEventListener('click', () => {
    const header = document.querySelector('header');
    if(header.classList.contains('header-active')){
         setTimeout(()=>{
        
        document.querySelector('.row-container').style.display = 'grid';
      }
      , 400)
      header.classList.remove('header-active');
    }else{
   
      document.querySelector('.row-container').style.display = 'none';
      header.classList.add('header-active');
      document.querySelector('.second-row').classList.toggle('second-row-active');
      document.querySelector('.thrid-row').classList.toggle('thrid-row-active');
    }
    });
}