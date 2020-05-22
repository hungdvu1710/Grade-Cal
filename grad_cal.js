//let studentID = localStorage.length;
let studentID = localStorage.length;
console.log(studentID);     
if(localStorage.getItem(`1`)){
    for(let i = 1; i<=localStorage.length;i++)
    {
        console.log(localStorage[i]);
        const[name,mathScore,phyScore,chemScore] = localStorage.getItem(`${i}`).split(",");
        appendRow(`${i}`,name,mathScore,phyScore,chemScore);
    }
} else{
    document.getElementById("calculate").style.visibility = "hidden";
}
    

document.querySelector("#submit").addEventListener("click",submit);
document.querySelector("#clear").addEventListener("click",removeOldEntries);
document.getElementById("analyze").style.visibility = "hidden";
const inputScore = document.getElementsByClassName("inputScore");
const inputName = document.querySelector(".fullname");
document.getElementById("calculate").addEventListener("click",calculate);
document.getElementById("analyze").addEventListener("click",analyze);
document.querySelector("form").addEventListener("submit", (e) => e.preventDefault());

//blacklist chars
const invalidCharsInScore = [
    "-",
    "+",
    "e",
    "E",
];
for(const input of inputScore){
    input.addEventListener("keydown", function(e) {
        if (invalidCharsInScore.includes(e.key)) {
            e.preventDefault();
        }
    })
}
const invalidCharsInName = [
    ";",
    ",",
];
inputName.addEventListener("keydown", function(e) {
    if (invalidCharsInName.includes(e.key)) {
        e.preventDefault();
    }
});


function removeOldEntries(){
    localStorage.clear();
    window.location.reload();
}
function setDefaultInputClass(){
    document.querySelector("#fullname").className = "fullname";
    document.querySelector("#math").className = "inputScore";
    document.querySelector("#phy").className = "inputScore";
    document.querySelector("#chem").className = "inputScore";
}
function isNameValid(name){
    console.log(typeof(name));
    console.log(name);
    console.log(name.trim());

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

    const cell1 = document.createElement("td");
    cell1.innerText = studentID;
    newRow.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.innerText = fullname;
    newRow.appendChild(cell2);

    const cell3 = document.createElement("td");
    cell3.innerText = math;
    cell3.className = "score";
    newRow.appendChild(cell3);

    const cell4 = document.createElement("td");
    cell4.className = "score";
    cell4.innerText = phy;
    newRow.appendChild(cell4);

    const cell5 = document.createElement("td");
    cell5.className = "score";
    cell5.innerText = chem;
    newRow.appendChild(cell5);

    const cell6 = document.createElement("td");
    cell6.innerText = "?";
    cell6.className = "mean";
    newRow.appendChild(cell6);
}
function clearInputField(){
    document.querySelector("#fullname").value = "";
    document.querySelector("#math").value = "";
    document.querySelector("#phy").value = "";
    document.querySelector("#chem").value = "";
}
function submit(){
    const fullname = document.querySelector("#fullname").value;
    const math = Number(document.querySelector("#math").value);
    const phy = Number(document.querySelector("#phy").value);
    const chem = Number(document.querySelector("#chem").value);
    if(isNameValid(fullname) && isScoreValid(math) && isScoreValid(phy) && isScoreValid(chem)){
        console.info("success")
        studentID++;
        appendRow(studentID,fullname,math,phy,chem);
        setDefaultInputClass();
        clearInputField();
        document.getElementById("calculate").style.visibility = "visible";
        localStorage.setItem(studentID,`${fullname},${math},${phy},${chem}`);
    }
    else{
        console.info("error");
        if(isNameValid(fullname)){
            document.querySelector("#fullname").className = "fullname";
        }else {
            document.querySelector("#fullname").className = "error";
        }

        if(isScoreValid(math)){
            document.querySelector("#math").className = "inputScore";
        } else{
            document.querySelector("#math").className = "error";
        }

        if(isScoreValid(phy)){
            document.querySelector("#phy").className = "inputScore";
        } else{
            document.querySelector("#phy").className = "error";
        }

        if(isScoreValid(chem)){
            document.querySelector("#chem").className = "inputScore";
        }else{
            document.querySelector("#chem").className = "error";
        }
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
    const rows =  document.querySelectorAll("#data tr:not(:first-child)");

    for(let row of rows){
        const dataCells = row.cells;
        dataCells.item(5).innerText = getMean(row);
        localStorage.setItem(dataCells.item(0).innerText,`${dataCells.item(1).innerText},${dataCells.item(2).innerText},${dataCells.item(3).innerText},${dataCells.item(4).innerText},${dataCells.item(5).innerText}`);
    }

    document.getElementById("analyze").style.visibility = "visible";
    document.getElementById("calculate").style.visibility = "hidden";
}
function analyze(){
    const rows =  document.querySelectorAll("#data tr:not(:first-child)");

    for(let row of rows){
        const mean = Number(row.cells.item(5).innerText);
        console.info(mean);
        if(mean >= 8){
            row.className = "red";
        }
    }

    document.getElementById("analyze").style.visibility = "hidden";
}