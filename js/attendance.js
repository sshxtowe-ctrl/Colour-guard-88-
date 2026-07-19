const attendanceKey = "cg_attendance";


const nameInput = document.getElementById("studentName");
const statusInput = document.getElementById("status");
const dateInput = document.getElementById("date");

const saveButton = document.getElementById("saveAttendance");

const attendanceList = document.getElementById("attendanceList");





function getAttendance(){

    return JSON.parse(
        localStorage.getItem(attendanceKey)
    ) || [];

}




function saveAttendance(data){

    localStorage.setItem(
        attendanceKey,
        JSON.stringify(data)
    );

}






function showAttendance(){


    let data = getAttendance();


    // ล่าสุดขึ้นก่อน

    data.sort((a,b)=>{

        return new Date(b.timeFull)
        -
        new Date(a.timeFull);

    });



    attendanceList.innerHTML="";



    if(data.length === 0){

        attendanceList.innerHTML =
        `
        <p class="empty">
        ยังไม่มีข้อมูล
        </p>
        `;

        return;

    }





    data.forEach((item,index)=>{


        const box = document.createElement("div");

        box.className="record";



        box.innerHTML = `

        <p>
        <b>ชื่อ:</b> ${item.name}
        </p>


        <p>
        <b>สถานะ:</b> ${item.status}
        </p>


        <p>
        <b>วันที่:</b> ${formatDate(item.date)}
        </p>


        <p>
        <b>เวลา:</b> ${item.time}
        </p>


        <button
        class="delete-btn"
        onclick="deleteAttendance(${index})">

        ลบ

        </button>

        `;



        attendanceList.appendChild(box);



    });


}








function formatDate(date){


    if(!date)
        return "-";



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









saveButton.addEventListener(
"click",
()=>{


    const name = nameInput.value;

    const status = statusInput.value;

    const date = dateInput.value;



    if(
        !name ||
        !status ||
        !date
    ){

        alert(
        "กรุณากรอกข้อมูลให้ครบ"
        );

        return;

    }



    const now = new Date();



    let data = getAttendance();



    data.push({

        name:name,

        status:status,

        date:date,

        time:
        now.toLocaleTimeString(
            "th-TH"
        ),

        timeFull:
        now.toISOString()

    });



    saveAttendance(data);



    showAttendance();



    // ล้างช่อง

    nameInput.value="";

    statusInput.value="";

    dateInput.value="";


});









function deleteAttendance(index){


    let data = getAttendance();



    data.splice(
        index,
        1
    );



    saveAttendance(data);



    showAttendance();


}






showAttendance();
