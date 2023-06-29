let form = document.querySelector(".form_data")
let input = document.querySelectorAll(".input")
let email = document.querySelector(".email")
let input_phone = document.querySelector(".phone")
let form_container = document.querySelector(".form")
let tipo_plan = []
let service_plan = []
let datosPlan = {
    tipo: "",
    precio: "",
    nombreServicio1: "",
    precioServicio1: "",
    nombreServicio2: "",
    precioServicio2: "",
}
let texto = "moises santos hernandez"
let newtext = texto.split(" ")
console.log(newtext)
let endtext = newtext.join(' ')
console.log(endtext)
let time_hora = new Date().getSeconds()
console.log("hora", time_hora)
let tiempoActual, intervalo
let precio, indice, posicio_clase;
let widht = window.innerWidth
console.log(widht)
document.addEventListener("DOMContentLoaded", () => {
    quitarClase()
    precios_services()
})

input.forEach(e => {
    e.addEventListener("focus", even => {
        let input_selecc = even.target
        console.log(input_selecc)
        check(input_selecc)
    })
})

function check(value) {
    input.forEach(element => {
        if (element !== value) {
            if (!element.value.trim()) {
                element.classList.add("border")
            } else {
                element.classList.remove("border")
            }
        }
    });
    if (value.classList[1] == "email") {
        validar(value)
    }
}

function validar(date) {
    console.log("si entro")
    let email_text = date.value.trim()
    let email_caracter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_text)
    if (email_caracter) {
        email.classList.remove("border")
    } else {
        email.classList.add("border")
    }
}

function validarForm() {
    form.addEventListener("submit", e => {
        e.preventDefault()
        // alert("ya puede proceguir")
        guardarDatos()
        let datos = JSON.parse(localStorage.getItem("data_user"))
        let verificarArreglo = obj => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] != "") {
                    return false;
                }
            }
            return true;
        }
        datos.forEach(obj => {
            if (verificarArreglo(obj)) {
                alert("llena los campos")
            } else {
                quitarClass()
                quitarClase()
            }
        })
    })
}
validarForm()

function quitarClass() {
    let cont = Number(localStorage.getItem("clas_cont")) || 0
    console.log("quitar clase elemem", cont)
    let color = document.querySelectorAll(".posicion_number")
    if (cont <= 5) {
        color[cont].classList.remove("color")
        cont++
        localStorage.setItem("clas_cont", JSON.stringify(cont))
    }
    if (cont == 4) {
        document.querySelector(".temporizador").classList.add("mostrar_temp")
        temporizador()
    }
}

function quitarClase() {
    let cont = Number(localStorage.getItem("clas_cont")) || 0
    console.log("contador quitar clase", cont)
    let color = document.querySelectorAll(".posicion_number")
    let forms = document.querySelectorAll(".data_form")
    color.forEach((ele, i) => {
        if (i <= cont) {
            ele.classList.remove("color")
        } else {
            ele.classList.add("color")
        }
    })
    forms.forEach((form, i) => {
        if (i == cont) {
            form.classList.remove("remove")
        } else {
            form.classList.add("remove")
        }
    })
    if (cont == 2) {
        // document.startViewTransition(() => precios_services())
        precios_services()
    } if (cont == 3) {
        data_end()
    }
    // if(cont==4){
    //     document.querySelector(".temporizador").classList.add("mostrar_temp")
    //     temporizador()
    // }
}

function actulizarCont() {
    let cont = Number(localStorage.getItem("clas_cont")) - 1
    console.log("cont resta", cont)
    localStorage.setItem("clas_cont", JSON.stringify(cont))
}

form_container.addEventListener("click", e => {
    let evento = e.target.classList[1]
    if (evento == "form_btn") {
        let datos = JSON.parse(localStorage.getItem("data_user"))
        datos.forEach(data => {
            let { nombre, correo, telefono } = data
            document.querySelector(".name").value = nombre
            document.querySelector(".email").value = correo
            document.querySelector(".phone").value = telefono
        })
    }
    if (evento == "previus") {
        actulizarCont()
        // document.startViewTransition(() => quitarClase())
        quitarClase()
    } else if (evento == "next") {
        quitarClass()
        // document.startViewTransition(() => quitarClase())
        quitarClase()
    }
    else if (evento == "btn_direccion" || evento == "circulo") {
        let circulito = document.querySelector(".btn_direccion").classList.toggle("izq")
        if (circulito) {
            document.querySelectorAll(".type_plan").forEach(agregar => {
                let span = document.createElement("span")
                span.classList.add("text_add-toogle")
                span.innerHTML = "2 monthly free"
                span.classList.add("color_span")
                agregar.appendChild(span)
            })
        } else {
            document.querySelectorAll(".type_plan span").forEach(eliminar => {
                eliminar.remove();
            });
        }
        localStorage.setItem("circulito", JSON.stringify(circulito))
        console.log(circulito)
        document.querySelector(".precio_arcade").innerHTML = circulito ? "$90/yr" : "$9/mo"
        document.querySelector(".precio_advanced").innerHTML = circulito ? "$120/yr" : "$12/mo"
        document.querySelector(".precio_pro").innerHTML = circulito ? "$150/yr" : "$15/mo"
        document.querySelectorAll(".tipo_pago-op")[1].classList.toggle("opacidad")
        document.querySelectorAll(".tipo_pago-op")[0].classList.toggle("opacidad")
        if (circulito) {
            actulizarArray()
        } else {
            actulizarArray()
        }
    } if (e.target.classList[0] == "type_plan") {
        datos_plan(e)
    } if (e.target.classList[0] == "input_check") {
        add_services(e)
    }
})

function datos_plan(e) {
    let posicion = Array.from(document.querySelectorAll(".type_plan")).findIndex(plan => plan.classList == e.target.classList)
    localStorage.setItem("posicion_plan", JSON.stringify(posicion))
    console.log("posicion", posicion)
    document.querySelectorAll(".type_plan").forEach((e, p) => {
        tipo = document.querySelectorAll(".type_plan")[posicion].querySelector(".name_type").textContent || ""
        console.log(tipo)
        precio = document.querySelectorAll(".type_plan")[posicion].querySelector(".precio").textContent || ""
        datosPlan = {
            tipo: tipo,
            precio: precio,
        }
        console.log(datosPlan)
        console.log(tipo_plan)
        if (p == posicion) {
            posicio_clase = e.classList.toggle("outline")
            if (posicio_clase) {
                tipo_plan = [datosPlan]
            } else {
                tipo_plan.splice(0, 1)
            }
        } else {
            posicio_clase = e.classList.remove("outline")
        }
        localStorage.setItem("tipo_plan-array", JSON.stringify(tipo_plan))
        console.log("final tipo plan", tipo_plan)
    })
}

function actulizarArray() {
    tipo_plan[0].precio = document.querySelectorAll(".type_plan")[Number(localStorage.getItem("posicion_plan"))].querySelector(".precio").textContent || ""
    tipo_plan[0].tipo = document.querySelectorAll(".type_plan")[Number(localStorage.getItem("posicion_plan"))].querySelector(".name_type").textContent || ""
    localStorage.setItem("tipo_plan-array", JSON.stringify(tipo_plan))
}

function precios_services() {
    console.log(JSON.parse(localStorage.getItem("circulito")))
    document.querySelector(".online").innerHTML = JSON.parse(localStorage.getItem("circulito")) ? "+$10/yr" : "+$1/mo"
    document.querySelector(".cloud").innerHTML = JSON.parse(localStorage.getItem("circulito")) ? "+$20/yr" : "+$2/mo"
    document.querySelector(".custom").innerHTML = JSON.parse(localStorage.getItem("circulito")) ? "+$20/yr" : "+$2/mo"
}

function add_services(e) {
    let posicion_input = Array.from(document.querySelectorAll(".input_check")).findIndex(services => services.classList == e.target.classList)
    console.log(posicion_input)
    let clase_blue = document.querySelectorAll(".type_services-opc")[posicion_input].classList.toggle("outline-blue")
    precio = document.querySelectorAll(".precio_service")[posicion_input].textContent
    tipo = document.querySelectorAll(".nombre_service")[posicion_input].textContent
    console.log(precio)
    console.log(tipo)
    datosPlan = {
        tipo: JSON.parse(localStorage.getItem("tipo_plan-array"))[0].tipo,
        precio: JSON.parse(localStorage.getItem("tipo_plan-array"))[0].precio,
        nombreServicio1: JSON.parse(localStorage.getItem("tipo_plan-array"))[0].nombreServicio1 || "",
        precioServicio1: JSON.parse(localStorage.getItem("tipo_plan-array"))[0].precioServicio1 || "",
        nombreServicio2: JSON.parse(localStorage.getItem("tipo_plan-array"))[0].nombreServicio2 || "",
        precioServicio2: JSON.parse(localStorage.getItem("tipo_plan-array"))[0].precioServicio2 || "",
    }
    console.table(datosPlan)
    if (clase_blue) {
        datosPlan[`nombreServicio${posicion_input + 1}`] = tipo;
        datosPlan[`precioServicio${posicion_input + 1}`] = precio;
    } else {
        datosPlan[`nombreServicio${posicion_input + 1}`] = "";
        datosPlan[`precioServicio${posicion_input + 1}`] = "";
    } if (posicion_input == 2) {
        for (let i = 1; i <= 2; i++) {
            datosPlan[`nombreServicio${i}`] = "";
            datosPlan[`precioServicio${i}`] = "";
        }
        document.querySelectorAll(".type_services-opc").forEach((e, i) => {
            if (i != 2) {
                e.classList.remove("outline-blue")
            } else {
                e.classList.toggle("outline-blue")
            }
        })
    }
    tipo_plan = [datosPlan]
    localStorage.setItem("tipo_plan-array", JSON.stringify(tipo_plan))
}

function extraerNumero(num) {
    const regex = /(\d+)/;
    const matches = num.match(regex);
    if (matches && matches.length > 0) {
        return parseInt(matches[0]);
    } else {
        return 0;
    }
}

function data_end() {
    document.querySelector(".date_end-time").innerHTML = ""
    document.querySelector(".descripcion_final").innerHTML = ""
    console.log(JSON.parse(localStorage.getItem("tipo_plan-array")))
    JSON.parse(localStorage.getItem("tipo_plan-array")).forEach(t => {
        let num1, num2 = 0
        let { tipo, precio } = t
        num1 = extraerNumero(precio)
        let div = `
            <span class="date_end-time-info">
            <h4 class="tipo_servicio">${tipo} <span class="tipo_servicio_tiempo">(${JSON.parse(localStorage.getItem("circulito")) ? "yearly" : "Monthly"})</span></h4>
            <span>change</span>
            </span>
            <span class="precio_servicio">${precio}</span>
        `
        let section1 = document.createElement("section")
        section1.classList.add("descripcion_final-text")
        let section2 = document.createElement("section")
        section2.classList.add("descripcion_final-text")
        section2.classList.add("mover-der")

        for (let i = 1; i <= 3; i++) {
            let nombreServicio = t[`nombreServicio${i}`];
            let precioServicio = t[`precioServicio${i}`];

            if (nombreServicio) {
                let p = document.createElement("p")
                p.textContent = nombreServicio
                section1.appendChild(p)
            }
            if (precioServicio) {
                num2 += extraerNumero(precioServicio);
                let p = document.createElement("p")
                p.textContent = precioServicio
                section2.appendChild(p)
            }
        }
        document.querySelector(".date_end-time").insertAdjacentHTML("beforeend", div)
        document.querySelector(".descripcion_final").appendChild(section1)
        document.querySelector(".descripcion_final").appendChild(section2)
        document.querySelector(".precio_total-final").innerHTML = `+$${num1 + num2}/${JSON.parse(localStorage.getItem("circulito")) ? "yr" : "mo"}`
        document.querySelector(".total_tiempo").textContent = `Total (Per ${JSON.parse(localStorage.getItem("circulito")) ? "year" : "month"})`
    })
}

function temporizador() {
    let tiempo = 60
    let fechaActual = new Date().getTime()
    tiempoActual = fechaActual + (tiempo * 1000)
    intervalo = setInterval(time, 1000)
}

function time() {
    let span
    let tiempoReal = new Date().getTime()
    let tiempoRestante = Math.floor((tiempoActual - tiempoReal) / 1000)
    if (tiempoRestante <= 0) {
        clearInterval(intervalo)
        borrarDatos()
    } else {
        let minutos = Math.floor(tiempoRestante / 60)
        let segundos = tiempoRestante % 60
        span = `${minutos}:${segundos.toString().padStart(2, "0")}`
        document.querySelector(".temporizador").classList.toggle("border-radius")
        document.querySelector(".temporizador").innerHTML = span
    }
}

function borrarDatos() {
    localStorage.removeItem("clas_cont")
    localStorage.removeItem("circulito")
    localStorage.removeItem("data_user")
    localStorage.removeItem("tipo_plan-array")
    location.reload()
}

function guardarDatos() {
    const datosAnteriores = JSON.parse(localStorage.getItem("data_user"));
    const data_form = {
        nombre: document.querySelector(".name").value,
        correo: document.querySelector(".email").value,
        telefono: document.querySelector(".phone").value,
    };

    if (datosAnteriores) {
        const datosUpdate = datosAnteriores.map(data => {
            if (
                data.nombre === data_form.nombre &&
                data.correo === data_form.correo &&
                data.telefono === data_form.telefono
            ) {
                // No hay cambios en los datos, devolver el objeto original
                return data;
            } else {
                // Se encontró un cambio, actualizar los datos
                return { ...data, ...data_form };
            }
        });

        localStorage.setItem("data_user", JSON.stringify(datosUpdate));
        console.log("datos actualizados", datosUpdate);
    } else {
        // No hay datos anteriores, guardar los datos por primera vez
        localStorage.setItem("data_user", JSON.stringify([data_form]));
        console.log("datos guardados por primera vez");
    }
}

