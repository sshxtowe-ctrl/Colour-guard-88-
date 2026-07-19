const storageKey = "cg_borrow";


const nameInput = document.getElementById("name");
const itemInput = document.getElementById("item");
const borrowDateInput = document.getElementById("borrowDate");
const returnDateInput = document.getElementById("returnDate");
const saveBtn = document.getElementById("saveBorrow");
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



function showList(){

    let data = getData();


    data.sort(function(a,b){

        return b.id - a.id;

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


        let div = document.createElement("div");

        div.className = "borrow-item";


        div.innerHTML = `

        <p>
        <b>ชื่อผู้ยืม:</b> ${item.name}
        </p>

        <p>
        <b>สิ่งที่ยืม:</b> ${item.item}
        </p>

        <p>
        <b>วันที่ยืม:</b> ${item.borrow}
        </p>

        <p>
        <b>วันที่คืน:</b> ${item.returnDate}
        </p>

        <p>
        <b>เวลาบันทึก:</b> ${item.time}
        </p>


        <button class="delete-btn">
        ลบ
        </button>

        `;



        div.querySelector("button")
        .onclick = function(){


            data.splice(index,1);

            saveData(data);

            showList();


        };



        borrowList.appendChild(div);


    });


}




saveBtn.onclick = function(){


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

        alert("กรุณากรอกข้อมูลให้ครบ");

        return;

    }





    let data = getData();


    let now = new Date();



    data.push({

        id: Date.now(),

        name:name,

        item:item,

        borrow:borrow,

        returnDate:returnDate,

        time:
        now.toLocaleTimeString("th-TH")

    });




    saveData(data);



    showList();



    nameInput.value = "";

    itemInput.value = "";

    borrowDateInput.value = "";

    returnDateInput.value = "";


};





showList();
