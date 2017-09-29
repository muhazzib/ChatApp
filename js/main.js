let loginfunction = () => {
    var localuser = document.getElementById("exampleInputEmail1");
    if (localuser.value != "") {
        localStorage.setItem("user", localuser.value);
        window.location = "home/home.html";
    }
}
let logoutfunction = () => {
    localStorage.clear("user");
    window.location = "../index.html"
}

let navfunction=()=>{
var greetuser =document.getElementById("greetuser");
var duaoutput=document.getElementById("duaoutput");
greetuser.innerHTML="Welcome "+localStorage.getItem("user");
    duaoutput.scrollTop = duaoutput.scrollHeight;
}