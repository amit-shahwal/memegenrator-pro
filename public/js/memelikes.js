// // import axios from "axios";
// import { showAlert } from "./alert";

 memelikess = async (data, count,id) => {
  try {
 // document.getElementById.getElementById("myCheck").checked = true;
 console.log(id,data);

    const liked = await axios({
      method: "POST",
      url: "http://127.0.0.1:9000/api/v1/users/likedphoto",
      data: {
        photo:data,
        likedid: id,
        
      },
    });

 {
      //showAlert("success", "Proceeding to your home page");
      location.reload();
    }
  } catch (err) {
    //showAlert("error", err.response.data.message);
  
  }
};
// function memelikess(x,y)
// {
// //alert('i am clicked',x,y);
// alert(x );
// alert(y)

// }