var StartVars = {
    MainBlock: document.getElementById('tasks'),
    addTask: document.getElementById('add'),
    nameTask: document.getElementById('Name'),
    typeTask: document.getElementById('Type'),
    timeTask: document.getElementById('Times'),
    massTask: [],
    massNameTask: [],
    indexTask: 0,
    ChangeBlock: document.getElementById('changeText'),
    ChangeAccept: document.getElementById('accept'),
    ChangeBack: document.getElementById('back'),
    ChangeDes: document.getElementById('newDesc'),
    CurrentName: undefined,
    CurrentDes: undefined,
    massNumber: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
};
var Task = /** @class */ (function () {
    function Task(Name, Type, Time) {
        this.Description = 'Description of Task';
        this.Name = Name;
        this.Type = Type;
        this.time = Time;
    }
    return Task;
}());
//EventListeners
StartVars.addTask.addEventListener('click', AddTask);
StartVars.ChangeAccept.addEventListener('click', ChangeAccept);
StartVars.ChangeBack.addEventListener('click', ChangeBack);
function AddTask() {
    var massName = StartVars.nameTask.value.trim().split('');
    console.log(massName);
    if (StartVars.nameTask.value.trim() === '' || StartVars.massNumber.indexOf(massName[0]) != -1) {
        console.log('Название не подходит');
        StartVars.nameTask.value = '';
    }
    else {
        var type = StartVars.typeTask.value;
        var time = StartVars.timeTask.value;
        var n = StartVars.nameTask.value.trim(); //name
        if (StartVars.massNameTask.indexOf(n) == -1) {
            var task = new Task(n, type, time); //Add object
            //Document.createElement
            var div = document.createElement('div');
            div.className = "task " + n;
            var top_1 = document.createElement('div');
            top_1.className = 'top';
            var name_1 = document.createElement('h1');
            name_1.className = 'h1Task';
            name_1.innerText = task.Name;
            var content = document.createElement('div');
            content.className = 'content';
            var describe = document.createElement('div');
            describe.className = 'descriptionTask';
            var p = document.createElement('p');
            p.innerText = task.Description;
            var about = document.createElement('div');
            about.className = 'aboutTask flex justify-center align-center wrap';
            var change = document.createElement('div');
            change.className = 'changedelete flex justify-center align-center';
            //Buttons
            //Change
            var buttonChange = document.createElement('button');
            buttonChange.innerText = 'Изменить';
            buttonChange.addEventListener('click', changeTask);
            //Delete
            var buttonDelete = document.createElement('button');
            buttonDelete.innerText = 'Удалить';
            buttonDelete.addEventListener('click', DeleteTask);
            //Color Time
            var h2time = document.createElement('h2');
            h2time.className = 'h2Task';
            if (StartVars.timeTask.value == 'Срочно') {
                h2time.classList.add('h2Red');
            }
            if (StartVars.timeTask.value == 'Последний день') {
                h2time.classList.add('h2Last');
            }
            if (StartVars.timeTask.value == 'В очереди') {
                h2time.classList.add('h2Yellow');
            }
            if (StartVars.timeTask.value == 'Подождёт') {
                h2time.classList.add('h2Green');
            }
            h2time.innerHTML = "" + task.time;
            //Type Time
            var h2type = document.createElement('h2');
            h2type.className = 'h2Task';
            h2type.innerHTML = "" + task.Type;
            if (StartVars.typeTask.value == 'Встреча') {
                h2type.classList.add('h2Green');
            }
            if (StartVars.typeTask.value == 'Код') {
                h2type.classList.add('h2Blue');
            }
            if (StartVars.typeTask.value == 'Домашние дела') {
                h2type.classList.add('h2Yellow');
            }
            if (StartVars.typeTask.value == 'Работа') {
                h2type.classList.add('h2Last');
            }
            //node.append
            div.append(top_1, content);
            top_1.append(name_1);
            content.append(describe, about, change);
            describe.append(p);
            about.append(h2type, h2time);
            change.append(buttonChange, buttonDelete);
            StartVars.MainBlock.append(div);
            // mass.push | new index | clear
            StartVars.massTask.push(task);
            StartVars.massNameTask.push(n);
            StartVars.indexTask++;
            StartVars.nameTask.value = '';
        }
    }
}
// Functions
//Change Task
function changeTask() {
    var CurrentTask = this;
    var DesCurrentTask = CurrentTask.parentNode.parentNode.firstChild.firstChild;
    var NameCurrentTask = CurrentTask.parentNode.parentNode.parentNode.firstChild.firstChild;
    StartVars.CurrentDes = DesCurrentTask;
    StartVars.CurrentName = NameCurrentTask.textContent;
    StartVars.massNameTask.forEach(function (element) {
        if (element === NameCurrentTask.textContent) {
            StartVars.ChangeBlock.style.display = "flex";
            StartVars.ChangeDes.value = DesCurrentTask.textContent;
        }
    });
}
//Accept Change
function ChangeAccept() {
    StartVars.CurrentDes.innerText = StartVars.ChangeDes.value;
    StartVars.ChangeBlock.style.display = "none";
}
//Deny Change
function ChangeBack() {
    StartVars.ChangeBlock.style.display = "none";
}
//Delete Task
function DeleteTask() {
    var CurrentTask = this;
    var NameCurrentTask = CurrentTask.parentNode.parentNode.parentNode.firstChild.firstChild;
    StartVars.massNameTask.forEach(function (elementName) {
        if (elementName === NameCurrentTask.textContent) {
            for (var index = 0; index < StartVars.massTask.length; index++) {
                if (StartVars.massTask[index].Name === NameCurrentTask.textContent) {
                    StartVars.massTask.splice(index, 1);
                    StartVars.massNameTask.splice(StartVars.massNameTask.indexOf(NameCurrentTask.textContent), 1);
                    StartVars.indexTask -= 1;
                    var RemoveNode = document.querySelector('.' + NameCurrentTask.textContent);
                    RemoveNode.remove();
                }
            }
        }
    });
}
