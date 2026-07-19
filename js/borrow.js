const storageKey = "cg_borrow";


document.addEventListener("DOMContentLoaded", function(){


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





    function formatDate(date){


        if(!date){
            return "-";
        }


        return new Date(date).toLocaleDateString(
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


            borrowList.innerHTML = `

            <p class="empty">
            ยังไม่มีข้อมูล
            </p>

            `;


            return;

        }





        data.forEach(function(item,index){



            const box =
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
            class="delete-btn"
            data-id="${index}">

            ลบ

            </button>

            `;



            borrowList.appendChild(box);


        });





        document
        .querySelectorAll(".delete-btn")
        .forEach(function(button){


            button.addEventListener(
                "click",
                function(){


                    const index =
                    this.dataset.id;



                    let data =
                    getData();



                    data.splice(index,1);



                    saveData(data);



                    showList();



                }
            );



        });



    }









    saveBtn.addEventListener(
        "click",
        function(){



            const name =
            nameInput.value.trim();



            const item =
            itemInput.value.trim();



            const borrow =
            borrowDateInput.value;



            const returnDate =
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






            const now =
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






            nameInput.value = "";

            itemInput.value = "";

            borrowDateInput.value = "";

            returnDateInput.value = "";



        }
    );







    showList();



});
