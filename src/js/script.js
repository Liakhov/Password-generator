let rangeValue = document.getElementById('range'),
    rangeValueDisplay = document.getElementById('rangeValueDisplay'),
    copyButton = document.querySelector('.copy'),
    inputs  = document.querySelectorAll('input'),
    numbers = '0123456789',
    smallLetter = 'abcdefghijklmnopqrstuvwxyz',
    bigLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=',
    sample = '';

rangeValue.onchange = function(){
    rangeValueDisplay.value  =  this.value;
    generatePass();
};
rangeValueDisplay.onchange = function () {
    rangeValue.value = this.value;
    generatePass();
};

document.getElementsByClassName('generate')[0].onclick = () => generatePass();

function generatePass() {
    document.getElementsByClassName('pass')[0].className = 'pass';

    let result = '';

    for(let item of inputs ){
        if(item.checked){
            if(item.getAttribute('name') === 'bigLetter'){
                sample = sample.concat(bigLetter);
            }
            if(item.getAttribute('name') === 'numbers'){
                sample = sample.concat(numbers);
            }
            if(item.getAttribute('name') === 'smallLetter'){
                sample = sample.concat(smallLetter);
            }
            if(item.getAttribute('name') === 'symbols'){
                sample = sample.concat(symbols);
            }
        }
    }
    for(let i = 0; i <  rangeValue.value; i++){
        result += sample.charAt(Math.floor(Math.random() * sample.length));
    }
    document.getElementById('pass').value = result;
    passwordStrength(result, sample);
    sample = '';
}

function passwordStrength(result, sample = `${smallLetter}${bigLetter}${numbers}`){
    let h = 0, pass = document.getElementsByClassName('pass')[0];

    h = result.length * (Math.log(sample.length)/Math.log(2)); // Формура энтропии

    if(h > 0 && h < 56 ){
        pass.classList.add('small-width');
    }else if(h > 56  && h < 64){
        pass.classList.add('part-width');
    }else if(h > 64){
        pass.classList.add('full-width');
    }
}

copyButton.onclick = function(){
    let copyText = document.getElementById('pass'),
        range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().addRange(range);

    try {
        let successful = document.execCommand('copy'),
            msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy email command was ' + msg);
    }catch(err) {
        console.log('Oops, unable to copy');
    }

    window.getSelection().removeAllRanges(); //Снятие выделения
}
generatePass();