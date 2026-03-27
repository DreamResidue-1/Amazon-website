

//   $(document).ready(function() {
//     var readURL = function(input) {
//       if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//           $('.profile-pic').attr('src', e.target.result);
//         }
//         reader.readAsDataURL(input.files[0]);
//       }
//     }

//     $(".file-upload").on('change', function(){
//       readURL(this);
//     });

//     $(".upload-button").on('click', function() {
//       $(".file-upload").click();
//     });
//   });



  window.addEventListener('load', function() {
    const fileInput = document.querySelector('.file-upload');
    const profilePic = document.querySelector('.profile-pic');
    const uploadBtn = document.querySelector('.upload-button');


    const defaultImage = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
  
    //const removeBtn = document.querySelector('.remove-image');

    
    
    
    // Handle Removal
    // if (removeBtn) {
    //   removeBtn.addEventListener('click', () => {
    //     localStorage.removeItem('user-profile-pic');
    //     profilePic.setAttribute('src', defaultImage);
    //     removeBtn.style.display = "none";
    //     fileInput.value = ""; // Clear input so the same file can be re-uploaded
    //   });
    // }
    // 1. Check if an image is already saved in LocalStorage
    const savedImage = localStorage.getItem('user-profile-pic');
    if (savedImage) {
    //  removeBtn.style.display = "flex"; // Show remove button if image exists
      profilePic.setAttribute('src', savedImage);
    }

    // 2. Function to read and SAVE the image
    const readURL = (input) => {
      if (input.files && input.files[0]) {
        const reader = new FileReader();

          reader.onload = function(e) {
          const imageData = e.target.result;
          
          // Display the image
          profilePic.setAttribute('src', imageData);
      //removeBtn.style.display = "flex"; // Show remove button if image exists
            
          // Save the image string to LocalStorage
          localStorage.setItem('user-profile-pic', imageData);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    // Event listeners
    fileInput.addEventListener('change', function() {
      readURL(this);
    });

    uploadBtn.addEventListener('click', function() {
      fileInput.click();
    });
  });


