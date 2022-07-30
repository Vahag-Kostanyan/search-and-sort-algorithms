const uploadFile = document.querySelector('.uploadFile');
const sortFile = document.querySelector('.sortFile');
const firstName = document.querySelector('.firstName');
const sortbtn = document.querySelector('.sortbtn');
const Table = document.querySelector('.table');
const text = document.querySelector('.text');
const searchBlock = document.querySelector('.searchBlock');
const sortButtons = document.querySelector('.sortButtons');
const searchInput = document.querySelector('.searchInput');
const searchButton = document.querySelector('.searchButton');
console.log(searchInput);
console.log(searchButton);
let arr = [];
let index = 0;

text.innerHTML = 'Enter CSV file'


sortFile.addEventListener('click', () => {
    Papa.parse(document.querySelector('.uploadFile').files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
            arr = result.data;
            addTable([...arr]);
        }
    })
})

function addTable(arr, order, sortWith) {
    if (arr.length == 0) {
        text.innerHTML = 'Enter CSV file';
        return;
    }

    text.innerHTML = '';
    sortButtons.innerHTML = ""
    searchBlock.classList.add('true')
    sortbtn.disabled = false

    Table.innerHTML = "";
    const header = arr[0];
    const row1 = Table.insertRow(0)
    const cell1 = row1.insertCell(0)
    cell1.outerHTML = `<th>#</th>`
    Object.keys(header).forEach((key, index) => {
        const cell = row1.insertCell(index + 1);
        cell.outerHTML = `<th>${key}</th>`

        const list = document.createElement('li');
        const listItem = document.createElement('a');
        listItem.innerHTML = `sort by ${key}`;
        listItem.className = "dropdown-item";

        if(sortWith == key){
            listItem.classList.add(order == "asc" ? "desc" : "asc")
        }

        list.appendChild(listItem)
        sortButtons.appendChild(list);

        listItem.addEventListener('click', (e) => {
            sort(arr, e.target.classList[1], key);
        })
    })

    arr.forEach((item, index) => {
        const row = Table.insertRow(index + 1)
        const cellIndex = row.insertCell(0)
        cellIndex.innerHTML = index + 1;

        Object.values(item).forEach((objItem, ind) => {
            const cell = row.insertCell(ind + 1);
            cell.innerHTML = objItem;
        })
    })
}

function sort(arr, currentClass, key) {
    const order = currentClass === "desc" ? "desc" : "asc";
    const currentFunc = order === "desc" ? sortDescOrder : sortAscOrder;

    const newArr = currentFunc([...arr], key)

    addTable(newArr, order, key)
}

function sortAscOrder(arr, key){
    console.log('asd');
    for(let z  = 0;z < arr.length; z++){
        if(!isNaN(Number(arr[z][key]))){
            arr[z][key] = Number(arr[z][key])  
        }
    }
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
           if(arr[j][key] > arr[j + 1][key]){
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
           }
        }
    }

    return arr;
}

function sortDescOrder(arr, key){
    console.log('desc');
    for(let z  = 0;z < arr.length; z++){
        if(!isNaN(Number(arr[z][key]))){
            arr[z][key] = Number(arr[z][key])  
        }
    }
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
           if(arr[j][key] < arr[j + 1][key]){
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
           }
        }
    }

    return arr;
}

searchInput.addEventListener('input', () => {
    if(searchInput.value == ''){
        addTable([...arr])
    }
})

searchButton.addEventListener('click', () => {
    const inputVal = searchInput.value;
    
    const newArr = search([...arr], inputVal)

    addTable(newArr);

})

function search(arr, inputVal){
    const newArr = [];
    
    arr.forEach(item => {
        let t = false
        Object.values(item).forEach(objItem => {
            if(String(objItem).toLowerCase().includes(inputVal.toLowerCase())){
                t = true;
            }
        })
        if(t) newArr.push(item)
    })
  return newArr
}