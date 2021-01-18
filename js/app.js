let clock = document.querySelector(".todo__clock")
let input = document.querySelector(".todo__input")
let addBtn = document.querySelector(".todo__btn")
let optionBox = document.querySelectorAll(".view")
let warning = document.querySelector(".todo__warning")
let creatList = document.querySelector(".todo__list")
let clear = document.querySelector(".todo__clearAll-btn")
let main = {
    init:function () {
        render()
        clear.addEventListener("click",deleteAll)
        add()
    }
}

function check (s) {
    if (s < 10) {
     s = "0" + s; 
    }
    return s
}

let days =["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday",]
function time() {
    let current = new Date
    let seconds = current.getSeconds()
    let minutes = current.getMinutes()
    let hours = current.getHours()
    let day = current.getDate()
    let month = current.getMonth()+1
    let year = current.getFullYear()
    hours = check(hours)
    minutes = check(minutes)
    seconds = check(seconds)
    return  days[current.getDay()]+" "+"Date: " +day+"/"+month+"/"+year+" "+"Time: "+hours +":"+ minutes+":"+seconds
}
setInterval(()=>{
    let show = time()
    clock.innerText = show
},1000)


class thing{
    constructor(name,status) {
        this.name = name
        this.status = status

        Object.defineProperty(this , "name",{
            get: function(){
                return name
            },
            set: function(value){
                if (value === "null" || value.trim()==="" ) {
                    throw new Error(" Dữ liệu đang trống ")
                }
                return name = value
            }
        })
        Object.defineProperty(this , "status",{
            get: function(){
                return status
            },
            set: function(value){
                return status = value
            }
        })
    }
}


let counter = 0
optionBox[0].style.color="rgb(0, 162, 255)"
optionBox.forEach((btn,i)=>{
    btn.addEventListener("click",()=>{
        optionBox.forEach(remove=>{
            remove.style.color="rgb(224, 224, 224)"
        })
        counter = i
        btn.style.color="rgb(0, 162, 255)"
        render()
    })
})

function render() {
    let list
    if (localStorage.getItem("bao_todoList") === null) {
        list = []
    }
    else{
        list = JSON.parse(localStorage.getItem("bao_todoList"))
    }

    let content
    let done
    let unDone
    let doneFil = list.filter(data=> data.status === true)
    let unDoneFil = list.filter(data=> data.status === false)


    switch (counter) {
        case 0:
            content = list.map(t=>
                `<div class="todo__thing">
                <input type="checkbox" class="check" value=${t.status}>
                <p class="todo__thing-name">${t.name}</p>
                <button href="" class="todo__thing-remove"><i class="fas fa-trash"></i></button>
            </div>`
            )
            creatList.innerHTML = content.join('')
            let checkBox = document.querySelectorAll(".check")
            let todoName = document.querySelectorAll(".todo__thing-name")
            list.forEach((value,i)=>{
                if (value.status === true) {
                    checkBox[i].checked = true
                    todoName[i].classList.add("check")
                }
                else{
                    checkBox[i].checked = false
                    todoName[i].classList.remove("check")
                }
            })
            checkBox.forEach((value,i) => {
                value.addEventListener("click",()=>{
                    checkStatus(value.checked,i)
                })
            });
        
            let btnRemo = document.querySelectorAll(".todo__thing-remove")
            btnRemo.forEach((btn,i)=>{
                btn.addEventListener("click",()=>{
                    removeItem(i)
                })
            })
            break;
        case 1:
            done = doneFil.map(t=>
                `<div class="todo__thing">
                <p class="todo__thing-name">${t.name}</p>
            </div>`
            )
            creatList.innerHTML = done.join('') 
            // let checkBoxD = document.querySelectorAll(".check")
            // let todoNameD = document.querySelectorAll(".todo__thing-name")
            // doneFil.forEach((value,i)=>{
            //     if (value.status === true) {
            //         checkBoxD[i].checked = true
            //         todoNameD[i].classList.add("check")
            //     }
            //     else{
            //         checkBoxD[i].checked = false
            //         todoNameD[i].classList.remove("check")
            //     }
            // })
            break;
        case 2:
            unDone = unDoneFil.map(t=>
                `<div class="todo__thing">
                <p class="todo__thing-name">${t.name}</p>
            </div>`
            )
            creatList.innerHTML = unDone.join('')
            // let checkBoxUD = document.querySelectorAll(".check")
            // let todoNameUD = document.querySelectorAll(".todo__thing-name")
            // unDone.forEach((value,i)=>{
            //     if (value.status === true) {
            //         checkBoxUD[i].checked = true
            //         todoNameUD[i].classList.add("check")
            //     }
            //     else{
            //         checkBoxUD[i].checked = false
            //         todoNameUD[i].classList.remove("check")
            //     }
            // })
            break;
    }
    // optionBox.addEventListener("click",()=>{
    //     switch (optionBox.value) {
    //         case"Completed":
    //             let done = list.filter(done=> done.status === true)
    //             content =  done.map(t=>
    //                 `<div class="todo__thing">
    //                 <input type="checkbox" class="check" value=${t.status}>
    //                 <p class="todo__thing-name">${t.name}</p>
    //                 <button href="" class="todo__thing-remove"><i class="fas fa-trash"></i></button>
    //             </div>`
    //             )
    //             render()   
    //             break;
    //         case"Uncompleted":
    //             let unDone = list.filter(un => un.status === false)
    //             content =  unDone.map(t=>
    //                 `<div class="todo__thing">
    //                 <input type="checkbox" class="check" value=${t.status}>
    //                 <p class="todo__thing-name">${t.name}</p>
    //                 <button href="" class="todo__thing-remove"><i class="fas fa-trash"></i></button>
    //             </div>`
    //             )
    //             render()
    //             break;            
    //     }
    // })

}

function checkStatus(value,i){
    let list
    if (localStorage.getItem("bao_todoList") === null) {
        list = []
    }
    else{
        list = JSON.parse(localStorage.getItem("bao_todoList"))
    }
    list[i].status = value
    console.log(list[i]);
    localStorage.setItem("bao_todoList",JSON.stringify(list))
    render()
}

function removeItem(i){
    let list
    if (localStorage.getItem("bao_todoList") === null) {
        list = []
    }
    else{
        list = JSON.parse(localStorage.getItem("bao_todoList"))
    }
    list.splice(i,1)
    localStorage.setItem("bao_todoList",JSON.stringify(list))
    render()
}

function deleteAll(){
    localStorage.removeItem("bao_todoList")
    render()
}

function save(value){
    let list
    if (localStorage.getItem("bao_todoList") === null) {
        list = []
    }
    else{
        list = JSON.parse(localStorage.getItem("bao_todoList"))
    }
    list.push(value)
    localStorage.setItem("bao_todoList",JSON.stringify(list))
    render()
}


function add(){
    addBtn.addEventListener("click",()=>{
        if (input.value === "" || input.value.trim() === ""){
            warning.innerText="Your input is empty !"
            warning.classList.add("add")
            input.addEventListener("input",()=>{
                warning.innerText=""
                warning.classList.remove("add")
            })
            return
        }
        let todo = new thing()
        todo.name = input.value
        todo.status = false
        save(todo)
        input.value = ""
    })
}

main.init()