const tryBtns = document.querySelectorAll('.try-sort-btn');
const imgBtns = document.querySelectorAll('.imgBtn')
const seeImgs = document.querySelectorAll('.modal-done')
const doneBtn = document.querySelector('.modal-done-try')
const xIcon = document.querySelector('.x-icon');
const sortTime = document.querySelector('.sort-time')
const sortArrElements = document.querySelector('.sort-arr-elements')

imgBtns.forEach(imgBtn => {
    imgBtn.addEventListener('click', (e) => {
        const currentImg = e.target.classList[1];

        seeImgs.forEach(img => {
            if (img.classList.contains(currentImg)) {
                img.classList.toggle('true')
            }
        })
    })
})

tryBtns.forEach(tryBtn => {
    tryBtn.addEventListener('click', (e) => {
        const currentBtn = e.target.classList[1];

        const arrLength = prompt("Write the length of the array");
        const arr = []

        for(let i = 0; i < arrLength; i++){
            arr[i] = parseInt(prompt(`Write the ${i + 1} element of the array`));
            while(isNaN(arr[i])){
                    arr[i] = parseInt(prompt(`Please write number for ${i + 1}`));
            }
        }
        
        let t1, t2,time;

        switch (currentBtn) {
            case 's-try':
                t1 = performance.now();
                Stry(arrLength, arr);
                t2 = performance.now();
                time =  String(t2 - t1);
                sortTime.innerHTML = `${time.slice(0,5)} ms`;
                break;
            case 'rb-try':
                t1 = performance.now();
                RBtry(arrLength, arr);
                t2 = performance.now();
                time = String(t2 - t1);
                sortTime.innerHTML = `${time.slice(0,5)} ms`;
                break;
            case 'ri-try':
                t1 = performance.now();
                RItry(arrLength, arr);
                t2 = performance.now();
                time = String(t2 - t1);
                sortTime.innerHTML = `${time.slice(0,5)} ms`;
                break;
            case 'im-try':
                t1 = performance.now();
                IMtry(arrLength,arr);
                t2 = performance.now();
                time = String(t2 - t1);
                sortTime.innerHTML = `${time.slice(0,5)} ms`;
                break;
            case 'q-try':
                t1 = performance.now();
                Qtry(arr, 0, arrLength - 1);
                t2 = performance.now();
                time = String(t2 - t1);
                sortTime.innerHTML = `${time.slice(0,5)} ms`;
                break;
            default:
                alert("Something is wrong");
        }
        
        doneBtn.classList.add('true');
        sortArrElements.innerHTML = `[ ${arr} ]`
    })
})

xIcon.addEventListener('click', () => {
    doneBtn.classList.remove('true');

})

function Stry(arrLength, arr) {

    let min_idx = 0;
    let min = 0

    for (let i = 0; i < arrLength; i++) {
        min_idx = i;
    for(let j = i + 1; j < arrLength; j++){
        if(arr[min_idx] > arr[j]){
            min_idx = j
        }
    }
    min = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = min;
    }

return arr
}
function RBtry(arrLength, arr) {
    doneBtn.classList.toggle('true');

    if(arrLength <= 1) return arr;

    for(let i = 0; i < arrLength; i++){
            if(arr[i] > arr[i+1]){
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
    }
    RBtry(arrLength-1, arr )
    return arr
}

function RItry(arrLength, arr) {
    doneBtn.classList.toggle('true');

    if(arrLength <= 1) return;

    RItry(arrLength -1, arr);

    let last = arr[arrLength - 1];
    let j = arrLength - 2;
    while(j >= 0 && arr[j] > last){
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
}


function IMtry(arrLength,arr) {
    doneBtn.classList.toggle('true');

    let left_start,curr_size;

    for(curr_size = 1; curr_size <= arrLength - 1; curr_size  = 2 * curr_size){
        for(left_start = 0; left_start < arrLength - 1; left_start += 2 * curr_size){

            let mid = Math.min(left_start + curr_size - 1, arrLength - 1);
            let right_end = Math.min(left_start + 2 * curr_size - 1, arrLength - 1);
            marge(arr,left_start,mid,right_end);
        }
    }

}

function marge(arr, left_start, mid, right_end){

    let i, j, k;
    let n1 = mid - left_start + 1;
    let n2 = right_end - mid;

    const L = Array(n1).fill(0);
    const R = Array(n2).fill(0);

    for( i = 0; i < n1; i++){
        L[i] = arr[left_start + i];
    }
    for(j = 0; j < n2; j++){
        R[j] = arr[mid + 1 + j];
    }

    j = 0;
    i = 0;
    k = left_start;

    while(i < n1 && j < n2){
        if(L[i] <= R[j]){
            arr[k] = L[i];
            i++;
        }else{
            arr[k] = R[j];
            j++;
        }
        k++
    }

    while(i < n1){
        arr[k] = L[i];
        i++;
        k++;
    }

    while(j < n2){
        arr[k] = R[j];
        j++;
        k++;
    }
}


//////////////


function Qtry(arr,low,arrLength) {
    doneBtn.classList.toggle('true');

    if(low < arrLength){

        let pi = partition(arr,low,arrLength);

        Qtry(arr, low, pi - 1);
        Qtry(arr, pi + 1, arrLength);
    }
}
function partition(arr, low, arrLength){

    let pivot = arr[arrLength];

    let i = low - 1;

    for(let j = low; j <= arrLength - 1; j++){
        if(arr[j] < pivot){
            i++;
            swap(arr,i,j);
        }
    }
    swap(arr,i + 1, arrLength);
    return i + 1;
}
function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}