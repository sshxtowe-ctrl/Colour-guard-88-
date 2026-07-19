const attendanceKey = "cg_attendance";


document.addEventListener("DOMContentLoaded", function(){


    const nameInput =
    document.getElementById("studentName");


    const statusInput =
    document.getElementById("status");


    const dateInput =
    document.getElementById("date");


    const saveButton =
    document.getElementById("saveAttendance");


    const attendanceList =
    document.getElementById("attendanceList");





    function getData(){

        return JSON.parse(
            localStorage.getItem(attendanceKey)
        ) || [];

    }





    function saveData(data){

        localStorage.setItem(
            attendanceKey,
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





        data.forEach(function(item,index){



            const box =
            document.createElement("div");



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
            data-index="${index}">

            ลบ

            </button>


            `;



            attendanceList.appendChild(box);



        });






        document
        .querySelectorAll(".delete-btn")
        .forEach(function(button){



            button.addEventListener(
                "click",
                function(){



                    let index =
                    this.dataset.index;



                    let data =
                    getData();



                    data.splice(index,1);



                    saveData(data);



                    showList();



                }
            );



        });



    }









    saveButton.addEventListener(
        "click",
        function(){



            const name =
            nameInput.value;


            const status =
            statusInput.value;


            const date =
            dateInput.value;





            if(
                name === "" ||
                status === "" ||
                date === ""
            ){


                alert(
                "กรุณากรอกข้อมูลให้ครบ"
                );


                return;


            }






            const now =
            new Date();




            let data =
            getData();





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






            saveData(data);



            showList();






            nameInput.value="";

            statusInput.value="";

            dateInput.value="";



        }
    );







    showList();



});
