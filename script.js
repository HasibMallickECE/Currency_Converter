const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

  let dropdowns=document.querySelectorAll(".dropdown select");
  let btn=document.querySelector("form button");
  let fromCurr=document.querySelector(".from select");
  let toCurr=document.querySelector(".to select");
  let msg=document.querySelector(".msg");

  for(let select of dropdowns){
    for(let currCode in countryList){
        let newoptions=document.createElement("option");
        newoptions.innerText=currCode;
        newoptions.value=currCode;
        if(currCode==="USD" && select.name==="from"){
            newoptions.selected="selected"
        }
        if(currCode==="INR" && select.name==="to"){
            newoptions.selected="selected"
        }

        
        select.append(newoptions);
    }
    select.addEventListener("change",(evnt)=>{
        updateflag(evnt.target)
    })
  }
  let updateflag=(element)=>{
    let currC=element.value;
    let countryC=countryList[currC];
    let nsrc=`https://flagsapi.com/${countryC}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    
    img.src=nsrc;
  };
  btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;

    if(amountValue===""||amountValue<1){
        amountValue=1;
        amount.value="1";
        
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    
   let rate=data[toCurr.value.toLowerCase()];
//    console.log(rate);
   let finalAmount=amountValue*rate;

//    console.log("final amount=",finalAmount);
   msg.innerText=`${amountValue} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;

  });