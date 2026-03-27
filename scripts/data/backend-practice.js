const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () =>{

 const page = window.open("array.html","_blank","height=200,width=400");
 page.write(xhr.response);
})




xhr.open('GET', '../amazon.html')
xhr.send();
