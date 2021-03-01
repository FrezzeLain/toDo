    //Начальные переменные

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
        TasksMassiv : [],
        TaskIndex : 0,
        NumbersMassiv : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        CurrnetTask: ''
    }

    //EventListeners

    ClientConst.ButtonAddTask.addEventListener('click', NewTask)
    ClientConst.ChangeAccept.addEventListener('click', AcceptChange)
    ClientConst.ChangeBack.addEventListener('click', RejectChange)

    //Классы

    class Task{
        config = {
            name: '',
            des: '',
            type: '',
            time: ''
        }

        constructor(Name, Type, Time){
            this.config.name = Name
            this.config.des = 'Default Description'
            this.config.type = Type
            this.config.time = Time
        }

        renderTask(){
            let status = IsTask(this.config.name)
            if(status === 1){
                console.log('Задача с таким именем уже существует.')
            } else{
                render(this.config)
                ClientConst.TasksMassiv[ClientConst.TaskIndex] = this
                ClientConst.TaskIndex++
                ClientConst.BlockNameTask.value = ''
            }
        }

        deleteThisTask(){
            let Block = ClientConst.BodyBlock.querySelector('.'+ClientConst.TasksMassiv[ClientConst.CurrnetTask].config.name)
            Block.remove()
        }

        changeThisTask(NewDes){
            console.log('Изменение описания:')
            this.config.des = NewDes
        }
    }

    //Функции

        //Добавление задачи
    
    function NewTask(){
        if(ClientConst.BlockNameTask.value.trim() == ''){
            console.log('Название не может быть пустой строкой')
        } else if(ClientConst.NumbersMassiv.indexOf(ClientConst.BlockNameTask.value.trim().split('')[0]) > -1){
            console.log('Название не может начинаться с цифры')
        } else{
            let NTask = new Task(ClientConst.BlockNameTask.value.trim(), ClientConst.BlockTypeTask.value, ClientConst.BlockTimeTask.value)
            NTask.renderTask()
        }
    }

        //Проверка наличия Задачи

    function IsTask(Name){
        Count = ClientConst.BodyBlock.querySelectorAll(`.${Name}`).length
        if(Count > 0){
            return 1
        }
        return 0
    }

        //Генерация блоков HTML

    function render(NewTask){
         //Создание объекта Класса Task
        let MyTask = NewTask
        //Считывание данных объекта
        let NameTask = MyTask.name
        let TypeTask = MyTask.type
        let TimeTask = MyTask.time
        let DesTask = MyTask.des
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
    }

        //Изменение описания задачи

    function changeTask(){
        let MassName = this.className.split('')
        for(let i = 0; i < 4; i++){
            MassName.splice(0,1)
        }
        MassName = MassName.join('')
        
        ClientConst.ChangeBlock.style.display = `flex`
        ClientConst.ChangeText.value = ClientConst.TasksMassiv[MassName].config.des
        ClientConst.CurrnetTask = MassName
    }

        //Принять изменения

    function AcceptChange(){
        let NewDes = ClientConst.ChangeText.value
        ClientConst.TasksMassiv[ClientConst.CurrnetTask].changeThisTask(NewDes)
        let CurrentMain = document.querySelector('.'+ClientConst.TasksMassiv[ClientConst.CurrnetTask].config.name)
        let CurrentP = CurrentMain.querySelector('.desP')
        CurrentP.innerText = NewDes
        ClientConst.ChangeBlock.style.display = `none`
    }

        //Отклонить изменения

    function RejectChange(){
        ClientConst.ChangeBlock.style.display = `none`
    }

        //Удаление задачи

    function deleteTask(){
        let MassName = this.className.split('')
        for(let i = 0; i < 4; i++){
            MassName.splice(0,1)
        }
        MassName = MassName.join('')
        ClientConst.CurrnetTask = MassName
        console.log(ClientConst.CurrnetTask)

        ClientConst.TasksMassiv[MassName].deleteThisTask()
        ClientConst.TasksMassiv[MassName] = ''
        ClientConst.TaskIndex = ClientConst.TaskIndex - 1
    }