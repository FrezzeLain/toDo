// Микрофон

    class Microphone{
        config= {
            Color: 'Black', //Цвет
            Type: 'Dynamic', //Тип
            State: 1 //Состояние
            // ...
        }

        Turn_On(){
            //Включить микрофон
            this.config.State = 1
        }

        Turn_Off(){
            //Выключить микрофон
            this.config.State = 0
        }
    }

// Компьютерная мышь

    class Mouse{
        config = {
            Color: 'Black', //Цвет
            DPI: 1600,  //DPI
            AmountButtons: 6,   //Кол-во кнопок
            LED: 1,  //Состояние подсветки
            Type: 'Лазерная' //Тип 
        }

        LED_On(){
            //Включить подсветку
            this.config.LED = 1
        }

        LED_Off(){
            //Выключить подсветку
            this.config.LED = 0
        }

        ChangeDpi(){
            //Сменить DPI
            if(this.config.DPI == 1600){
                this.config.DPI = 1400
            } else if(this.config.DPI == 1400){
                this.config.DPI = 900
            } else{
                this.config.DPI = 1600
            }
        }
        
        ButtonClick(Button){
            //Обработчики событий в зависимости от нажатой клавиши
        }
    }

// Кровать

    class MyBed{
        config = {
            Material: 'Дерево', //Материал
            Type: 'Односпальная', //Тип кровати
            IsClothes: false, //Наличие постельного белья
            IsReady: false // Заправлена | Не заправлена
        }

        ClothesConfig = {
            Type: 'Синтетика', //Тип белья
            Color: 'White', //Цвет белья
        }

        CLothesOn(ClothColor, ClothType){
            //Поместить бельё на кровать
            this.config.IsClothes = true
            this.ClothesConfig.Color = ClothColor
            this.ClothesConfig.Type = ClothType
        }

        ClothesOff(){
            //Снять бельё с кровати
            this.config.IsClothes = false
        }

        ReadyOn(){
            //Заправить кровать
            this.config.IsReady = true
        }

        ReadyOff(){
            //Расправить кровать
            this.config.IsReady = false
        }
    }

// Сетевой фильтр (Удлиннитель)

    class Udlinnitel{
        config = {
            Power: false, //Наличие питания
            Color: 'White', //Цвет
            AmountSlot: 6, //Кол - во разъёмов
            SlotsNow: 6, //Кол - во свободных слотов
            IsOn: false, // Включен | Выключен
        }

        AddUser(){
            //Подключить устройство к фильтру
            this.config.SlotsNow--
        }

        RemoveUser(){
            //Отключить устройство от фильтра
            this.config.SlotsNow++
        }

        PowerOn(){
            //Подать питание на филтр
            this.config.Power = true
        }

        PowerOff(){
            //Отключить фильтр от сети
            this.config.Power = false
        }

        FiltrOn(){
            //Включить фиьтр
            this.config.IsOn = true
        }

        FiltrOff(){
            //Выключить фильтр
            this.config.IsOn = false
        }
    }

// Компьютерный стол

    class Table{
        config = {
            Width: 80, //Ширина
            Length: 140, //Длина
            Height: 80 //Высота
        }
    }

// Офисное кресло

    class OfficeChair{
        config = {
            MaxHeight: 80, //Максимальная высота
            Width: 70, //Ширина
            CurrnetHeight: 75, //Текущая высота
            Material: 'Кожа', //Материал
            Color: 'Black' //Цвет
        }

        ChangeHeight(Way, Amount){
            //Изменить текущую высоту кресла
            if(Way = `Up`){
                this.config.CurrnetHeight +=Amount
            } else{
                this.config.CurrnetHeight -=Amount
            }
        }
    }

// Окно

    class MyWindow{
        config = {
            Type: 'Пластиковое', //Тип окна
            Width: 140, //Ширина
            Height: 260, //Высота
            IsOpen: false // Открыто | Закрыто
        }

        Open(){
            //Открыть окно
            this.config.IsOpen = true
        }

        Close(){
            //Закрыть окно
            this.config.IsOpen = false
        }
    }

// Ноутбук

    class NoteBook{
        config = {
            Weight: 2200, //Вес
            VideoCard: 'Nvidia1050', //Видеокарта
            CPU: 'intelI5', //Процессор
            System: 'Windows10PRO', //Операционная система
            SystemCooling: 'Активная', //Тип системы охлаждения
            AmountSlotsRAM: 2, //Кол - во слотов под оперативную память
            IsOn: false, // Включен | Выключен
            Power: false, //Питание (Зарядка)
            USBslots: 3, //Кол - во слотов USB
            CurrnetUSB: 0 //Свободные слоты USB
        }

        ScreenConfig = {
            Diagonal: "16:9", //Диагональ
            Resolution: '1920x1080', //Разрешение
            Type: 'IPS', //Тип экрана
            Hertz: '60' //Герцовка
        }

        CPUConfig = {
            // ...
        }

        VideoConfig = {
            // ...
        }

        RAMConfig = {
            CurrentRAM_Amount: 0, //Кол - во плашек оперативной памяти (Не занятых)
            RAM_Gb: 16, //Объём оперативной памяти
            RAM_Type: 'DDR4' //Тип оперативной памяти
        }

        NoteOn(){
            //Включить ноутбук
            this.config.IsOn = true
        }

        NoteOff(){
            //Выключить ноутбук
            this.config.IsOn = false
        }

        PowerOn(){
            //Поставить на зарядку
            this.config.Power = true
        }

        PowerOff(){
            //Прекратить зарядку
            this.config.Power = false
        }

        AddUSBUser(USB){
            //Добавить устройство USB
            if(this.config.CurrnetUSB > 2){
                console.log('Нет свободных USB слотов.')
            } else{
                this.config.CurrnetUSB++
            }
        }

        RemoveUSBUser(USB){
            //Извлечь USB устройство
            this.config.CurrnetUSB--
        }
    }
