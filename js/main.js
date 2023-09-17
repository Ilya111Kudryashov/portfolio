const btn=document.querySelector('.menu-btn');
const nav=document.querySelector('.menu');
const btnDarkMode=document.querySelector('.dark-mode-btn');
// burger menu btn
btn.addEventListener('click',()=>{
    nav.classList.toggle('menu-open');
});


// 1. проверка темной темы в localeStorage на уровне системных настроек
if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
}


// 2. проверка темной темы в localeStorage
if(localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
}else if(localStorage.getItem('darkMode') === 'light'){
    btnDarkMode.classList.remove('dark-mode-btn--active');
    document.body.classList.remove('dark');
}


// если меняем системные настройки- меняем тему
window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (event)=>{
    const newColorScheme= event.matches ? "dark" : "light";

    if (newColorScheme=== "dark"){
        btnDarkMode.classList.add("dark-mode-btn--active");
        document.body.classList.add("dark");
        localStorage.setItem('darkMode', 'dark');
    }
    else{
        btnDarkMode.classList.remove("dark-mode-btn--active");
        document.body.classList.remove("dark");
        localStorage.setItem('darkMode', 'light');
    }
});


// включение ночного режима по кнопке
btnDarkMode.onclick=function(){
    btnDarkMode.classList.toggle('dark-mode-btn--active');
    const isDark= document.body.classList.toggle('dark');

    if(isDark){
        localStorage.setItem('darkMode', 'dark');
    }else{
        localStorage.setItem('darkMode', 'light');
    }
}

// функция для получения или установки значения в локальном хранилище
function getOrSetLocalStorage(key, initialValue){
    const value=localStorage.getItem(key);
    if(value===null){
        localStorage.setItem(key,initialValue);
        return initialValue;
    }
    return parseInt(value);
}

// увеличиваем счетчик посещений
let totalVisits=getOrSetLocalStorage('totalVisits',0)+1;
localStorage.setItem('totalVisits',totalVisits);
document.querySelector('.totalVisits').textContent=totalVisits;

// проеряем,была ли посещена страница ранее
let uniqueVisits=getOrSetLocalStorage('uniqueVisits',0);
if(uniqueVisits===0){
    uniqueVisits=1;
    localStorage.setItem('uniqueVisits',uniqueVisits);
}
document.querySelector('.uniqueVisits').textContent=uniqueVisits;