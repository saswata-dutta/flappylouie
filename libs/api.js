let switchl = (function() {
    if(sessionStorage.getItem('logged') === null) {
        document.querySelector('.loggedout').style.display='flex'
        document.querySelector('.loggedin').style.display='none'
    } else {
        document.querySelector('.loggedout').style.display='none'
        document.querySelector('.loggedin').style.display='flex'
        let name = sessionStorage.getItem('name')
        let score = sessionStorage.getItem('score')
        document.getElementById('w').innerHTML = `Welcome ${name}`
        document.getElementById('s').innerHTML = `Your Max Score: ${score}`
    }
    });
switchl();

let populate = (async function() {
    const response = await fetch(`https://www.flappybirdbackendapi.ml/scoreboard`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    });
    const myJson = await response.json();
    let tbody = document.getElementById('b')
    let c = document.querySelectorAll('#b > tr');
    for(let i of c) {
        if(i.id === 'append') {
            continue;
        }
        i.parentNode.removeChild(i);
    }
    for(let data of myJson){
        let tr = document.createElement('tr');
        let u = document.createElement('td');
        let s = document.createElement('td');

        u.innerHTML = data[0];
        s.innerHTML = data[1];
        tr.appendChild(u)
        tr.appendChild(s)
        tbody.appendChild(tr)
    }
})

populate();

async function login() {
    let username = document.getElementById("username")
    let password = document.getElementById("password")
    if(username === '') {
    alert('Please input username')
    return;
    }

    if(password === '') {
    alert('Pleaser input password')
    return;
    }
    username = username.value
    password = password.value
    const response = await fetch(`https://www.flappybirdbackendapi.ml/login?username=${username}&password=${password}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
    });
    const myJson = await response.json();

    let max = myJson['output']
    console.log(max === 'Wrong Password')
    if(max === 'Wrong Password') {
    alert(max);
    return;
    }

    sessionStorage.setItem('logged', true)
    sessionStorage.setItem('name', username)
    sessionStorage.setItem('score', max)
    switchl();
}

function logout() {
    sessionStorage.clear();
    switchl();
}