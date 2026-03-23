function ReusableCode(value){
   if(!value.trim()){

      let popUp = document.querySelector('.search-bar-conainer .pop-up');
      popUp.innerHTML = 'Invalid input';
      popUp.style.opacity = '1';
      setTimeout(() => {
        popUp.style.opacity = '0';
      }, 2000);
      
    }else{
      
      search(value)
      
    }
}

let inputSearchBar = document.querySelector('input.search-bar');
export function searchBar(){
  inputSearchBar.addEventListener('keydown', event =>{
  if(event.key === 'Enter'){
    let value = event.target.value;
    ReusableCode(value)
  }
})

}

searchBar();
export function searchBtn(){
 document.querySelector('.search-button').addEventListener('click', () =>{
  let value = document.querySelector('input.search-bar').value;
  ReusableCode(value);
 })
}

export function search(q){
 
  
  location.href = `search.html?word=${q}`;

}