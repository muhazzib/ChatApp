let database = firebase.database().ref("/");
var textarea=document.getElementById("exampleFormControlTextarea1");
let duaoutput=document.getElementById("duaoutput");
var datearray=["Mon","Tues","Wed","Thurs","Fri","Sat","Sun"];

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
greetuser.innerHTML="Welcome "+localStorage.getItem("user");
}

var sendfunction=()=>{
    var sender=localStorage.getItem("user");
    var currentwholedate=new Date();

    var currentdate=currentwholedate.getDate();
    var currentday=currentwholedate.getDay();
    var currentmonth=currentwholedate.getMonth();
    var currentyear=currentwholedate.getFullYear();
    var currenthour=currentwholedate.getHours();
    var currentmin=currentwholedate.getMinutes();



  switch(currentday){
      case 0: currentday="Sun";
      break;
      case 1: currentday="Mon"
      break;
      case 2: currentday="Tues";
      break;
      case 3: currentday="Wed"
      break;
      case 4: currentday="Thurs";
      break;
      case 5: currentday="Fri"
      break;
      case 6: currentday="Sat"
  }
    if(textarea.value!=""){
        var senderobject={
            sendername:sender,
            message:textarea.value,
            sendingdate:currentdate,
            sendingday:currentday,
            sendingmonth:currentmonth,
            sendingyear:currentyear,
            sendinghour:currenthour,
            sendingminute:currentmin
        }
        database.child("conversation").push(senderobject);
        textarea.value="";
    }
}


let clearlocalstorage=()=>localStorage.clear("user");

let renderchat=(obj)=>{
    var alert=document.createElement("div");
    alert.setAttribute("style","word-wrap:break-word")
    alert.setAttribute("class","alert alert-light");
    var sendernamediv=document.createElement("h5");
    var sendernametext=document.createTextNode(obj.sendername);
    sendernamediv.appendChild(sendernametext);

    var datediv=document.createElement("div");
    var small=document.createElement("small");
    small.setAttribute("class","timecustom")
    var datetext=document.createTextNode(obj.sendingday+","+obj.sendingdate+"/"+obj.sendingmonth+"/"+obj.sendingyear);
    small.appendChild(datetext);

    var timesmall=document.createElement("small");
    timesmall.setAttribute("class","timecustom");
    var timetext=document.createTextNode(obj.sendinghour+":"+obj.sendingminute)

    timesmall.appendChild(timetext);
    datediv.appendChild(small)
    datediv.appendChild(timesmall)



    

    var alerttext=document.createTextNode(obj.message);
    alert.appendChild(sendernamediv)
    alert.appendChild(alerttext);
    alert.appendChild(datediv);
    duaoutput.appendChild(alert)
}


database.child("conversation").on("child_added",function(snap){
var obj=snap.val()
renderchat(obj)
var duaoutput=document.getElementById("duaoutput");

duaoutput.scrollTop = duaoutput.scrollHeight;

})