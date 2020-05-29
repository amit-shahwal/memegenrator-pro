// // import axios from "axios";
// import { showAlert } from "./alert";

//document.getElementById('')

function incre(count,data) {
  // hmesha pehle wale ko select kr le rha.....

  const mm=document.getElementById(`${data}`)
  //const memegenrator = document.querySelector(".nav__el--meme");
 
  var x=`${count}` *1;
  var y =x+1;
  mm.value=`LIKES❤${y}`
  //alert(mm.value);
  // memeee.innerHTML=`&nbsp; &nbsp; &nbsp; LIKES❤${count+1}`
  // console.log(memeee.innerHTML);
}

memelikess = async (data, count, id) => {
  try {
    // document.getElementById.getElementById("myCheck").checked = true;
    console.log(id, data);

    const liked = await axios({
      method: "POST",
      url: "/api/v1/users/likedphoto",
      data: {
        photo: data,
        likedid: id,
      },
    });

    //showAlert("success", "Proceeding to your home page");
   // location.reload();
    incre(count,data);
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
