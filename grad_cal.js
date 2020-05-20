let studentID = 0;
document.querySelector("#submit").addEventListener("click",submit);
document.getElementById("analyze").style.visibility = "hidden";
document.getElementById("calculate").style.visibility = "hidden";
const inputScore = document.getElementsByClassName("inputScore");
document.getElementById("calculate").addEventListener("click",calculate);
document.getElementById("analyze").addEventListener("click",analyze);
const invalidChars = [
  "-",
  "+",
  "e",
  "E",
];
for(const i of inputScore){
    i.addEventListener("keydown", function(e) {
        if (invalidChars.includes(e.key)) {
          e.preventDefault();
        }
    })
}
function setDefaultInputClass(){
    document.querySelector("#fullname").className = "fullname";
    document.querySelector("#math").className = "inputScore";
    document.querySelector("#phy").className = "inputScore";
    document.querySelector("#chem").className = "inputScore";
}
function isNameValid(name){
    console.log(typeof(name))
    console.log(name);
    console.log(name.trim())
    if(typeof(name) === 'string' && name.trim()!=""){
        return true;
    }
    return false;
};
function isScoreValid(score){
    if(!score){
        return false;
    }
    if(score > 10 || score < 0){
        return false;
    }
    return true;
};


function appendRow(studentID, fullname, math, phy, chem) {
    //add new row to the end of database
    const tableRef = document.querySelector("#data");
    const newRow = tableRef.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    cell1.innerText = studentID;

    const cell2 = newRow.insertCell(1);
    cell2.innerText = fullname;

    const cell3 = newRow.insertCell(2);
    cell3.innerText = math;
    cell3.className = "score";

    const cell4 = newRow.insertCell(3);
    cell4.className = "score";
    cell4.innerText = phy;

    const cell5 = newRow.insertCell(4);
    cell5.className = "score";
    cell5.innerText = chem;

    const cell6 = newRow.insertCell(5);
    cell6.innerText = "?";
    cell6.className = "mean";
}

function submit(){
    const fullname = document.querySelector("#fullname").value;
    const math = Number(document.querySelector("#math").value);
    const phy = Number(document.querySelector("#phy").value);
    const chem = Number(document.querySelector("#chem").value);
    studentID++;
    if(isNameValid(fullname) && isScoreValid(math) && isScoreValid(phy) && isScoreValid(math) && isScoreValid(chem)){
        console.info("success")
        appendRow(studentID,fullname,math,phy,chem);
        setDefaultInputClass()
        document.querySelector("#fullname").value = "";
        document.querySelector("#math").value = "";
        document.querySelector("#phy").value = "";
        document.querySelector("#chem").value = "";
        document.getElementById("calculate").style.visibility = "visible";
    }
    else{
        console.info("error")
        if(!isNameValid(fullname)) document.querySelector("#fullname").className = "error";
        else document.querySelector("#fullname").className = "fullname";
        if(!isScoreValid(math)) document.querySelector("#math").className = "error";
        else document.querySelector("#math").className = "inputScore";
        if(!isScoreValid(phy)) document.querySelector("#phy").className = "error";
        else document.querySelector("#phy").className = "inputScore";
        if(!isScoreValid(chem)) document.querySelector("#chem").className = "error";
        else  document.querySelector("#chem").className = "inputScore";
    }
}
function getMean(row){
    let total = 0;
    for(let i = 2; i<5; i++){
        total +=Number(row.cells.item(i).innerText);
        console.log(row.cells.item(i).innerText);
    }
    return Math.round((total / 3) * 10) / 10; //chia trung bình và làm tròn
}
function calculate(){
    rows =  document.querySelectorAll("#data tr:not(:first-child)");
    for(let row of rows){
        row.cells.item(5).innerText = getMean(row);
    }
    document.getElementById("analyze").style.visibility = "visible";
    document.getElementById("calculate").style.visibility = "hidden";
}
function analyze(){
    rows =  document.querySelectorAll("#data tr:not(:first-child)");
    for(let row of rows){
        const mean = Number(row.cells.item(5).innerText);
        console.info(mean);
        if(mean >= 8){
            row.className = "red";
        }
    }
    document.getElementById("analyze").style.visibility = "hidden";
}