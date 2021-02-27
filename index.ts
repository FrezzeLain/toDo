let StartVars = {
    MainBlock: document.getElementById('tasks'),
    addTask: document.getElementById('add'),
    nameTask: document.getElementById('Name') as HTMLInputElement,
    typeTask: document.getElementById('Type') as HTMLSelectElement,
    timeTask: document.getElementById('Times') as HTMLSelectElement,
    massTask: [],
    massNameTask: [],
    indexTask: 0 as number,
    ChangeBlock: document.getElementById('changeText') as HTMLDivElement,
    ChangeAccept: document.getElementById('accept') as HTMLButtonElement,
    ChangeBack: document.getElementById('back') as HTMLButtonElement,
    ChangeDes: document.getElementById('newDesc') as HTMLTextAreaElement,
    CurrentName: undefined,
    CurrentDes: undefined,
    massNumber: ['0','1','2','3','4','5','6','7','8','9']
}

interface ITask{
    Name: string
    Type: string
    Description: string
    time: string
}

class Task implements ITask{
    Name: string
    Type: string
    Description: string = 'Description of Task'
    time: string
    constructor(Name: string, Type: string, Time: string){
        this.Name = Name
        this.Type = Type
        this.time = Time
    }
}
//EventListeners

StartVars.addTask.addEventListener('click', AddTask)
StartVars.ChangeAccept.addEventListener('click', ChangeAccept)
StartVars.ChangeBack.addEventListener('click', ChangeBack)

function AddTask():void{
    let massName = StartVars.nameTask.value.trim().split('')
    console.log(massName)
    if(StartVars.nameTask.value.trim() === '' || StartVars.massNumber.indexOf(massName[0]) != -1){
        console.log('Название не подходит')
        StartVars.nameTask.value = ''
    } else{
        let type = StartVars.typeTask.value
        let time = StartVars.timeTask.value
        let n = StartVars.nameTask.value.trim()  //name
        if(StartVars.massNameTask.indexOf(n) == -1){ 

            let task = new Task(n,type, time) //Add object

            //Document.createElement

            let div = document.createElement('div')
            div.className = `task ${n}`
            let top = document.createElement('div')
            top.className = 'top'
            let name = document.createElement('h1')
            name.className = 'h1Task'
            name.innerText = task.Name
            let content = document.createElement('div')
            content.className = 'content'
            let describe = document.createElement('div')
            describe.className = 'descriptionTask'
            let p = document.createElement('p')
            p.innerText = task.Description
            let about = document.createElement('div')
            about.className = 'aboutTask flex justify-center align-center wrap'
            
            let change = document.createElement('div')
            change.className = 'changedelete flex justify-center align-center'

            //Buttons

                //Change

            let buttonChange : HTMLButtonElement = document.createElement('button')
            buttonChange.innerText = 'Изменить'
            buttonChange.addEventListener('click', changeTask)

                //Delete

            let buttonDelete : HTMLButtonElement = document.createElement('button')
            buttonDelete.innerText = 'Удалить'
            buttonDelete.addEventListener('click', DeleteTask)

            //Color Time

            let h2time = document.createElement('h2')
            h2time.className = 'h2Task'
            if(StartVars.timeTask.value == 'Срочно'){
                h2time.classList.add('h2Red')
            }
            if(StartVars.timeTask.value == 'Последний день'){
                h2time.classList.add('h2Last')
            }
            if(StartVars.timeTask.value == 'В очереди'){
                h2time.classList.add('h2Yellow')
            }
            if(StartVars.timeTask.value == 'Подождёт'){
                h2time.classList.add('h2Green')
            }
            h2time.innerHTML = `${task.time}`

            //Type Time

            let h2type = document.createElement('h2')
            h2type.className = 'h2Task'
            h2type.innerHTML = `${task.Type}`
            if(StartVars.typeTask.value == 'Встреча'){
                h2type.classList.add('h2Green')
            }
            if(StartVars.typeTask.value == 'Код'){
                h2type.classList.add('h2Blue')
            }
            if(StartVars.typeTask.value == 'Домашние дела'){
                h2type.classList.add('h2Yellow')
            }
            if(StartVars.typeTask.value == 'Работа'){
                h2type.classList.add('h2Last')
            }

            //node.append

            div.append(top, content)
            top.append(name)
            content.append(describe, about, change)
            describe.append(p)
            about.append(h2type, h2time)
            change.append(buttonChange, buttonDelete)
            StartVars.MainBlock.append(div)
            
            // mass.push | new index | clear

            StartVars.massTask.push(task)
            StartVars.massNameTask.push(n)
            StartVars.indexTask++
            StartVars.nameTask.value = ''
        }
    }
}

// Functions

    //Change Task

function changeTask(){
    let CurrentTask : HTMLButtonElement = this
    let DesCurrentTask = CurrentTask.parentNode.parentNode.firstChild.firstChild
    let NameCurrentTask = CurrentTask.parentNode.parentNode.parentNode.firstChild.firstChild
    StartVars.CurrentDes = DesCurrentTask
    StartVars.CurrentName = NameCurrentTask.textContent
    StartVars.massNameTask.forEach(element => {
        if(element === NameCurrentTask.textContent){
            StartVars.ChangeBlock.style.display = `flex`
            StartVars.ChangeDes.value = DesCurrentTask.textContent
        }
    })
}

    //Accept Change

    function ChangeAccept(){
        StartVars.CurrentDes.innerText = StartVars.ChangeDes.value
        StartVars.ChangeBlock.style.display = `none`
    }

    //Deny Change

    function ChangeBack(){
        StartVars.ChangeBlock.style.display = `none`
    }

    //Delete Task

    function DeleteTask(){
        let CurrentTask : HTMLButtonElement = this
        let NameCurrentTask = CurrentTask.parentNode.parentNode.parentNode.firstChild.firstChild

        StartVars.massNameTask.forEach(elementName => {
            if(elementName === NameCurrentTask.textContent){
                for (let index = 0; index < StartVars.massTask.length; index++) {
                    if(StartVars.massTask[index].Name === NameCurrentTask.textContent){
                        StartVars.massTask.splice(index, 1)
                        StartVars.massNameTask.splice(StartVars.massNameTask.indexOf(NameCurrentTask.textContent), 1)
                        StartVars.indexTask -= 1
                        let RemoveNode = document.querySelector('.' + NameCurrentTask.textContent)
                        RemoveNode.remove()
                    }
                }
            }
        });
    }