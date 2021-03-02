// Классы

class MyList{
    MassivTasks = []

    RenderOne(Index){
        //Считывание данных объекта
        let NameTask = this.MassivTasks[Index].config.Name
        let TypeTask = this.MassivTasks[Index].config.Type
        let TimeTask = this.MassivTasks[Index].config.Time
        let DesTask = this.MassivTasks[Index].config.Description
        //Генерация HTML - элементов
            //Основыне блоки
        let MainDIv = document.createElement('div')
        MainDIv.className = (`task ${NameTask}`)
        let TopMain = document.createElement('div')
        TopMain.classList.add('top')
        let MainName = document.createElement('h1')
        MainName.classList.add('h1Task')
            MainName.innerText = NameTask
        let MainContent = document.createElement('div')
        MainContent.classList.add('content')
        let Description = document.createElement('div')
        Description.classList.add('descriptionTask')
            let DescriptionP = document.createElement('p')
            DescriptionP.className = 'desP'
            DescriptionP.innerText = DesTask
        let MainAbout = document.createElement('div')
        MainAbout.className = ('aboutTask flex justify-center align-center wrap')
        let MainChange = document.createElement('div')
        MainChange.className = ('changedelete flex justify-center align-center')
        let Time = document.createElement('h2')
        Time.innerText = TimeTask
        Time.className = 'h2Task'
        if(TimeTask == 'Срочно'){
            Time.classList.add('h2Red')
        }
        if(TimeTask == 'Последний день'){
            Time.classList.add('h2Last')
        }
        if(TimeTask == 'В очереди'){
            Time.classList.add('h2Yellow')
        }
        if(TimeTask == 'Подождёт'){
            Time.classList.add('h2Green')
        }
        let Type = document.createElement('h2')
        Type.innerText = TypeTask
        Type.className = 'h2Task'
        if(TypeTask == 'Встреча'){
            Type.classList.add('h2Green')
        }
        if(TypeTask == 'Код'){
            Type.classList.add('h2Blue')
        }
        if(TypeTask == 'Домашние дела'){
            Type.classList.add('h2Yellow')
        }
        if(TypeTask == 'Работа'){
            Type.classList.add('h2Last')
        }
            //Кнопки
        let buttonChange = document.createElement('button')
        buttonChange.className = `htqr${ClientConst.TaskIndex}`
        buttonChange.innerText = 'Изменить'
        buttonChange.addEventListener('click', changeTask)
        let buttonDelete = document.createElement('button')
        buttonDelete.className = `htqr${ClientConst.TaskIndex}`
        buttonDelete.innerText = 'Удалить'
        buttonDelete.addEventListener('click', deleteTask)
            //Node.append 
        MainDIv.append(TopMain, MainContent)
        TopMain.append(MainName)
        MainContent.append(Description, MainAbout, MainChange)
        Description.append(DescriptionP)
        MainAbout.append(Type, Time)
        MainChange.append(buttonChange, buttonDelete)
        ClientConst.BodyBlock.append(MainDIv)
        ClientConst.TaskIndex++
    }

    RenderAll(){
        for (let index = 0; index < this.MassivTasks.length; index++) {
            if(this.MassivTasks[index] != null){
                this.RenderOne(index)
            } else{
                ClientConst.TaskIndex++
            }            
        }
    }

    Delete(TaskIndex){
        this.MassivTasks[TaskIndex] = null
    }
}

class Task{
    config = {
        Name: '',
        Description: 'Deafult description',
        Type: '',
        Time: ''
    }

    constructor(Name, Type, Time){
        this.config.Name = Name
        this.config.Type = Type
        this.config.Time = Time
    }

    Change(NewDescription){
        this.config.Description = NewDescription
    } 
}

//Начальные переменные

let AllTasks = new MyList

let ClientConst = {
    //Функциональные блоки
    BodyBlock : document.getElementById('tasks'),
    ButtonAddTask : document.getElementById('add'),
    ChangeBlock : document.getElementById('changeText'),
    ChangeAccept : document.getElementById('accept'),
    ChangeBack : document.getElementById('back'),
    ChangeText : document.getElementById('newDesc'),
    //Блоки с переменными
    BlockNameTask : document.getElementById('Name'),
    BlockTypeTask : document.getElementById('Type'),
    BlockTimeTask : document.getElementById('Time'),
    //Логические данные
    TaskIndex : 0,
    NumbersMassiv : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '!', ',', '$', '#', '?', '*'],
    CurrnetTask: ''
}

//EventListeners

ClientConst.ButtonAddTask.addEventListener('click', addTask)
ClientConst.ChangeAccept.addEventListener('click', AcceptChange)
ClientConst.ChangeBack.addEventListener('click', RejectChange)

//Функции

function addTask(){
    if(ClientConst.BlockNameTask.value.trim() == '' || ClientConst.NumbersMassiv.indexOf(ClientConst.BlockNameTask.value.trim().split('')[0]) != -1){
        console.log('Имя задачи не может быть пустой строкой, а так же не может начинаться с цифры.')
    } else{
        let NewTask = new Task(ClientConst.BlockNameTask.value, ClientConst.BlockTypeTask.value, ClientConst.BlockTimeTask.value)
        let ResultOfCheck = CheckTask(NewTask.config.Name)
        if(ResultOfCheck != 1){
            console.log(`Добавляю новую задачу с именем: ${NewTask.config.Name}`)
            AllTasks.MassivTasks[ClientConst.TaskIndex] = NewTask
            AllTasks.RenderOne(ClientConst.TaskIndex)
            ClientConst.BlockNameTask.value = ''
        } else{
            console.log(`Задача с именем ${NewTask.config.Name} уже существует.`)
        }
    }
}

function CheckTask(NameTask){
    for (let index = 0; index < AllTasks.MassivTasks.length; index++) {
        if(AllTasks.MassivTasks[index] == null){

        } else{
            if(NameTask.toUpperCase() == AllTasks.MassivTasks[index].config.Name.toUpperCase()){
                return 1
            }
        }
    }
    return 0
}

function changeTask(){
    let MassName = this.className.split('')
        for(let i = 0; i < 4; i++){
            MassName.splice(0,1)
        }
        MassName = MassName.join('')

        ClientConst.ChangeBlock.style.display = `flex`
        ClientConst.ChangeText.value = AllTasks.MassivTasks[MassName].config.Description
        ClientConst.CurrnetTask = MassName
}

function AcceptChange(){
    let NewDes = ClientConst.ChangeText.value
    AllTasks.MassivTasks[ClientConst.CurrnetTask].Change(NewDes)
    let CurrentMain = document.querySelector('.'+AllTasks.MassivTasks[ClientConst.CurrnetTask].config.Name)
    let CurrentP = CurrentMain.querySelector('.desP')
    CurrentP.innerText = NewDes
    ClientConst.ChangeBlock.style.display = `none`
}

function RejectChange(){
    ClientConst.ChangeBlock.style.display = `none`
} 

function deleteTask(){
    let MassName = this.className.split('')
    for(let i = 0; i < 4; i++){
        MassName.splice(0,1)
    }
    MassName = MassName.join('')
    ClientConst.CurrnetTask = MassName
    AllTasks.Delete(MassName)
    console.log(MassName)
    ClientConst.TaskIndex = 0
    ClientConst.BodyBlock.innerHTML = ''
    AllTasks.RenderAll()
} 
