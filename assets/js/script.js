let validacao = {
    enviarFormulario: (event) => {
        event.preventDefault();

        let send = true;
        let inputs = form.querySelectorAll('input');

        validacao.limparErros();

        for(let i = 0; i < inputs.length; i ++){
            let input = inputs[i];
            input.style.borderColor = '';
            check = validacao.checarValidacao(input);

            if(check != undefined){
                send = false;
                
                validacao.mostrarErro(input, check);
            }
        }

        if(send){
            form.submit();
        }
    },
    checarValidacao: (input) => {
        let regras = input.getAttribute('data-rules');
        
        if(regras != null){
            let regra = regras.split('|');

            for(let r in regra){
                let rDetalhes = regra[r].split(':');
                switch(rDetalhes[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatório.';
                        }
                        break;
                    case 'min':
                        //console.log(input.value.length);
                        if(input.value.length < rDetalhes[1]){
                            return 'O campo deve conter no mínimo ' +rDetalhes[1] +' caracteres.'
                        }
                        break;
                    case 'email':
                        let reg = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
                        if(!reg.test(input.value)){
                            return 'E-mail inválido.'
                        }
                        break;
                }
            }
        }
        
    },
    mostrarErro: (input, check) => {
        input.style.borderColor = '#f54141';
        let divNova = document.createElement('div');
        
        divNova.classList = 'error';
        divNova.innerHTML = check;

        input.parentNode.appendChild(divNova);
    },
    limparErros: () => {
        let erros = document.querySelectorAll('.error');

        for(let i = 0; i < erros.length; i ++){
            erros[i].parentNode.removeChild(erros[i]);
        }
    }
};

let form = document.querySelector('.validation');

form.addEventListener('submit', validacao.enviarFormulario)

