//validacion de formularios
const $error = document.querySelectorAll('.error');

//modal datos del usuario
const $modal_data = document.querySelector('#modal-data');
const $name_user = document.querySelector('#name-user');
const $document_type_user = document.querySelector('#document-type-user');
const $document_user = document.querySelector('#document-user');

//informacion requerida
const $age = document.querySelector('#age');
const $weight = document.querySelector('#weight');
const $height = document.querySelector('#height');
const $physical_activity = document.querySelector('#physical-activity');

//genero
const $female = document.querySelector('#female');
const $male = document.querySelector('#male');

//form
const $form = document.querySelector('#form-calculator');

//resultado
const $result_container = document.querySelector('#result-container');
const $result = document.querySelector('#result');

const paramsBMR = {
    weight: 10,
    height: 6.25,
    age: 5,
    female: 161,
    male: 5,

    calculate () {
        let population;

        let BMR = (this.weight * parseInt($weight.value))
                + (this.height * parseInt($height.value))
                - (this.age * parseInt($age.value));

        if ($female.checked) {
            BMR = (BMR - this.female) * parseFloat($physical_activity.value);
        } else {
            BMR = (BMR + this.male) * parseFloat($physical_activity.value);
        }

        /*
        - Entre 15 y 29 años: Joven.
        - Entre 30 y 59 años: adultos.
        - Entre 60 años en adelante: adultos mayores.
        */

        if ($age.value >= 15 && $age.value <= 29) {
            population = "Joven"
        } else if ($age.value >= 30 && $age.value <= 59) {
            population = "Adulto"
        } else {
            population = "Adulto Mayor"
        }

        /*
        "El paciente (nombre del paciente) identificado con (tipo de documento)
        NO.(número de documento), requiere un total de (cantidad calorías) kcal
        para el sostenimiento de su TBM"
        */

        $result.innerHTML =
        `
            <h2 class="text-center">${population}</h2>
            <hr />
            <i>Paciente:</i> ${$name_user.value}<br />
            <i>Tipo de documento:</i> ${$document_type_user.value}<br />
            <i>Numero de documento:</i> ${$document_user.value}
            <hr />
            Requiere un total de ${Math.round(BMR)} kcal
            para mantener su peso actual
        `;
    },

    validate () {
        let flag = [false, false, false];

        if (isNaN($age.value) || $age.value === "") {
            $error[0].classList.remove('d-none')

            $error[0].textContent = "Introduce una edad valida";

            flag[0] = false;
        } else {
            if ($age.value < 15) {
                $error[0].classList.remove('d-none')

                $error[0].textContent = "Introduce una edad mayor o igual a 15";

                flag[0] = false;

            }else {
                $error[0].classList.add('d-none')

                flag[0] = true;
            }
        }
        
        if (isNaN($weight.value) || $weight.value === "") {
            $error[1].classList.remove('d-none')

            $error[1].textContent = "Introduce un peso valido";

            flag[1] = false;
        } else {
            $error[1].classList.add('d-none')

            flag[1] = true;
        }

        if (isNaN($height.value) || $height.value === "") {
            $error[2].classList.remove('d-none')

            $error[2].textContent = "Introduce una altura valida";

            flag[2] = false;
        } else {
            $error[2].classList.add('d-none')

            flag[2] = true;
        }

        if (flag[0] && flag[1] && flag[2]) {
            return true;
        } else {
            return false;
        }
    },

    validate2 () {
        let flag;

        if (!isNaN($name_user.value) || $name_user.value === "") {
            $error[3].classList.remove('d-none')
            $error[3].textContent = "Introduce un nombre valido";

            flag = false;
        } else {
            $error[3].classList.add('d-none')

            if (isNaN($document_user.value) || $document_user.value === "") {
                $error[4].classList.remove('d-none')
                $error[4].textContent = "Introduce un numero de documento valido";
    
                flag = false;
            } else {
                $error[4].classList.add('d-none')
    
                flag = true;
            }
        }

        console.log(flag)

        return flag
    }
}

document.addEventListener("click", e => {
    if (e.target.matches('#submit-data-user')) {
        
        e.preventDefault();

        if (paramsBMR.validate2()) {
            $modal_data.classList.add("d-none");
        }

    }
    
    if (e.target.matches('#male')) {

        $female.removeAttribute("checked")
        $male.setAttribute("checked","true")

    } else if (e.target.matches('#female')) {

        $female.setAttribute("checked","true")
        $male.removeAttribute("checked")
    
    }

    if (e.target.matches("#calculate")) {

		e.preventDefault();
        
        setTimeout(() => {
            $result_container.classList.remove('animate__fadeInUp')
        },1000)

        if (paramsBMR.validate()) {
            paramsBMR.calculate();
            
            $result_container.classList.remove('d-none');
            $result_container.classList.add('animate__fadeInUp');
        }

    }
});