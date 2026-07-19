const storageKey = "cg_borrow";

const nameInput = document.getElementById("name");
const itemInput = document.getElementById("item");
const borrowDateInput = document.getElementById("borrowDate");
const returnDateInput = document.getElementById("returnDate");
const saveBtn = document.getElementById("saveBorrow");
const borrowList = document.getElementById("borrowList");


function getBorrowData(){

    return JSON.parse(
        localStorage.getItem(storageKey)
    ) || [];

}



function saveBorrowData(data){

    localStorage.setItem(
        storageKey,
        JSON.stringify(data)
    );

}




function showBorrowList(){

    let data = getBorrowData();


    // เรียงล่าสุด -> เก่าสุด
    data.sort((a,b)=>{

        return new Date(
            b.timestampFull
        ) - new Date(
            a.timestampFull
        );

    });



    borrowList.innerHTML="";


    if(data.length === 0){

        borrowList.innerHTML =
        `<p class="empty">
        ยังไม่มีข้อมูล
        </p>`;

        return;

    }



    data.forEach((borrow,index)=>{


        const div = document.createElement("div");

        div.className="borrow-item";


        div.innerHTML=`

        <p><b>ชื่อผู้ยืม:</b> ${borrow.name}</p>

        <p><b>สิ่งที่ยืม:</b> ${borrow.item}</p>

        <p><b>วันที่ยืม:</b> ${formatDate(borrow.borrow)}</p>

        <p><b>วันที่คืน:</b> ${formatDate(borrow.return)}</p>

        <p><b>เวลาที่บันทึก:</b> ${borrow.timestamp}</p>

        <button 
        class="delete-btn"
        onclick="deleteBorrow(${index})">

        ลบ

        </button>

        `;


        borrowList.appendChild(div);


    });


}





function formatDate(date){

    if(!date) return "-";


    const d = new Date(date);


    return d.toLocaleDateString(
        "th-TH",
        {
            year:"numeric",
            month:"long",
            day:"numeric"
        }
    );

}





saveBtn.addEventListener(
"click",
()=>{


    const name = nameInput.value.trim();
    const item = itemInput.value.trim();
    const borrow = borrowDateInput.value;
    const returnDate = returnDateInput.value;



    if(
        !name ||
        !item ||
        !borrow ||
        !returnDate
    ){

        alert(
        "กรุณากรอกข้อมูลให้ครบ"
        );

        return;

    }




    const now = new Date();


    const data = getBorrowData();



    data.push({

        name:name,

        item:item,

        borrow:borrow,

        return:returnDate,

        timestamp:
        now.toLocaleTimeString(
            "th-TH"
        ),

        timestampFull:
        now.toISOString()

    });



    saveBorrowData(data);



    showBorrowList();



    // ล้างฟอร์ม

    nameInput.value="";
    itemInput.value="";
    borrowDateInput.value="";
    returnDateInput.value="";


});







function deleteBorrow(index){


    let data = getBorrowData();



    data.splice(
        index,
        1
    );



    saveBorrowData(data);



    showBorrowList();


}







// โหลดข้อมูลทันทีเมื่อเปิดหน้า

showBorrowList();
