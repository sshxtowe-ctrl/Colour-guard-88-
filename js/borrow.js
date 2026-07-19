document.addEventListener("DOMContentLoaded", function(){


const storageKey = "cg_borrow";


const nameInput = document.getElementById("name");
const itemInput = document.getElementById("item");
const borrowDateInput = document.getElementById("borrowDate");
const returnDateInput = document.getElementById("returnDate");

const saveButton = document.getElementById("saveBorrow");

const borrowList = document.getElementById("borrowList");





function getData(){

    return JSON.parse(
        localStorage.getItem(storageKey)
    ) || [];

}





function saveData(data){

    localStorage.setItem(
        storageKey,
        JSON.stringify(data)
    );

}







function formatDate(date){


    if(!date){
        return "-";
    }


    return new Date(date)
    .toLocaleDateString(
        "th-TH",
        {
            year:"numeric",
            month:"long",
            day:"numeric"
        }
    );


}









function showList(){


    let data = getData();



    data.sort(function(a,b){

        return new Date(b.timeFull)
        -
        new Date(a.timeFull);

    });





    borrowList.innerHTML = "";





    if(data.length === 0){


        borrowList.innerHTML =

        `
        <p class="empty">
        ยังไม่มีข้อมูล
        </p>
        `;


        return;

    }







    data.forEach(function(item,index){



        let box =
        document.createElement("div");



        box.className = "borrow-item";



        box.innerHTML = `


        <p>
        <b>ชื่อผู้ยืม:</b>
        ${item.name}
        </p>


        <p>
        <b>สิ่งที่ยืม:</b>
        ${item.item}
        </p>


        <p>
        <b>วันที่ยืม:</b>
        ${formatDate(item.borrow)}
        </p>


        <p>
        <b>วันที่คืน:</b>
        ${formatDate(item.returnDate)}
        </p>


        <p>
        <b>เวลาที่บันทึก:</b>
        ${item.time}
        </p>


        <button 
        class="delete-btn">

        ลบ

        </button>


        `;





        box.querySelector("button")
        .onclick = function(){


            let data =
            getData();


            data.splice(index,1);


            saveData(data);


            showList();


        };





        borrowList.appendChild(box);



    });



}









saveButton.addEventListener(
"click",
function(){



    let name =
    nameInput.value;


    let item =
    itemInput.value.trim();


    let borrow =
    borrowDateInput.value;


    let returnDate =
    returnDateInput.value;





    if(
        name === "" ||
        item === "" ||
        borrow === "" ||
        returnDate === ""
    ){


        alert(
        "กรุณากรอกข้อมูลให้ครบ"
        );


        return;


    }






    let now =
    new Date();




    let data =
    getData();






    data.push({

        name:name,

        item:item,

        borrow:borrow,

        returnDate:returnDate,


        time:
        now.toLocaleTimeString(
            "th-TH"
        ),


        timeFull:
        now.toISOString()


    });







    saveData(data);



    showList();






    nameInput.value="";

    itemInput.value="";

    borrowDateInput.value="";

    returnDateInput.value="";




});









showList();



});
