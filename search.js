const trySearchBtns = document.querySelectorAll('.try-search-Btn');
const modalSearch = document.querySelector('.modal-search-done');
const Form = document.querySelector('.form');
const searchBtn = document.querySelector('.searchBtn');
const searchInput = document.querySelector('.searchInput');
const searchArrElements = document.querySelector('.search-arr-element');
const lastArr = document.querySelector('.last-arr');
const Xicon = document.querySelector('.search-x-icon');
const Stime = document.querySelector('.search-time')

let currentAlgorithm;
let arr = [];
let search = -1;
let arrLength
let t1,t2,time,currentFunction

searchInput.addEventListener('input', (e) => {
    searchBtn.disabled = !e.target.value;
    lastArr.disabled = e.target.value
})

Xicon.addEventListener('click', () => {
    modalSearch.classList.remove('true');
})

trySearchBtns.forEach(trySearchBtn => {
    trySearchBtn.addEventListener('click', (e) => {
        const currentSearchBtn = e.target.classList[1];

        arrLength = +prompt('write the length of the arr');

        for(let i = 0; i < arrLength; i++){
            arr[i] = parseInt(prompt(`Write the ${i + 1} element of the array`));
            while(isNaN(arr[i])){
                    arr[i] = parseInt(prompt(`Please write number for ${i + 1}`));
            }
        }
        searchArrElements.innerHTML = `[ ${arr} ]`
        currentAlgorithm = currentSearchBtn;

        modalSearch.classList.add('true')
    })
})

lastArr.addEventListener('click', () => {
    searchArrElements.innerHTML = `[ ${arr} ]`

})
Form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchVal = e.target.searchInput.value;

    switch (currentAlgorithm) {
        case 'l-try':
            t1 = performance.now();
            search = Ltry(arr,arrLength,searchVal);
            t2 = performance.now();
            time = String(t2 - t1);
            Stime.innerHTML = time.slice(0,5)
            break;
        case 'j-try':
            t1 = performance.now();
            search = Jtry(arr,searchVal,arrLength);
            t2 = performance.now();
            time = String(t2 - t1);
            Stime.innerHTML = time.slice(0,5);
            break;
        case 'e-try':
            t1 = performance.now();
            search = Etry(arr,arrLength,searchVal);
            t2 = performance.now();
            time = String(t2 - t1);
            Stime.innerHTML = time.slice(0,5);
            break;
        case 'f-try':
            console.log('f-done');
            t1 = performance.now();
            search = Ftry(arr,searchVal,arrLength);
            t2 = performance.now();
            time = String(t2 - t1);
            Stime.innerHTML = time.slice(0,5);
            break;
        case 'rpls-try':
            t1 = performance.now();
            search = RPLStry(arr,0,arrLength,searchVal);
            t2 = performance.now();
            time = String(t2 - t1);
            Stime.innerHTML = time.slice(0,5);
            break;
        default:
            alert("Something is wrong");
        }
        search != -1 ? searchArrElements.innerHTML = `Number ${searchVal} is at index ${search} ` 
        : searchArrElements.innerHTML = `Can't find this ${searchVal} item `

        searchVal = 'v'
    })

function Ltry(arr, arrLength,searchVal){

    let left = 0;
    let rigth = arrLength - 1;

    for(left = 0; left <= rigth;){

        if(arr[left] == searchVal){
            return left;
        }else if(arr[rigth] == searchVal){
            return rigth;
        }
        left++;
        rigth--;
    }
        return -1
}

////
function Jtry(arr,searchVal,arrLength){

    let step = Math.sqrt(arrLength);
    let prev = 0;

    while(arr[Math.min(step,arrLength) - 1] < searchVal){
        step = step;
        step += Math.min(arrLength);
        if(prev >= arrLength) return -1;
        
    }

    while(arr[prev] < searchVal){
        prev++;
        if(prev == Math.min(step, arrLength)) return -1;
    }
    if(arr[prev] == searchVal) return prev;

    return -1
}
////
function Etry(arr,arrLength,searchVal){   
    if (arr[0] == searchVal)
        return 0;
    if(arr[arrLength - 1] == searchVal) return arrLength - 1
    let i = 1;
    while (i < arrLength && arr[i] <= searchVal)
        i = i * 2;

    return binarySearch(arr, i/2, Math.min(i, arrLength - 1), searchVal);
}
function binarySearch(arr, l, r, searchVal){
     if (r >= l){
         let mid = l

         if (arr[mid] == searchVal)
             return mid;
   
         if (arr[mid] > searchVal)
             return binarySearch(arr, l, mid - 1, searchVal);
   
         return binarySearch(arr, mid + 1, r, searchVal);
     }
     return -1;
 }

///

function Ftry(arr,searchVal,arrLength){
    let fibm2 = 0;
    let fibm1 = 1;
    let fibm = fibm2 + fibm1;

    while(fibm < arrLength){
        fibm2 = fibm1;
        fibm1 = fibm;
        fibm = fibm2 + fibm1;
    }

    let offset = -1;

    while(fibm > 1){

        let i = Math.min(offset + fibm2, arrLength - 1);

        if(arr[i] < searchVal){
            fibm = fibm1;
            fibm1 = fibm2;
            fibm2 = fibm - fibm1;
            offset = i;
        }
        else if (arr[i] > searchVal){
            fibm = fibm2;
            fibm1 = fibm1 - fibm2;
            fibm2 = fibm - fibm1;
        }
        else return i;
    }

    if(fibm1 && arr[arrLength - 1] == searchVal){
        return arrLength - 1;
    }

    return -1;
}
///

function RPLStry(arr,l,r,searchVal){
    if(l < r){
        if(arr[l] == searchVal) return l;

        if(arr[r] == searchVal) return r;

    return RPLStry(arr, l + 1, r - 1, searchVal)
    }
    return -1
}