
// VAR, LET CONST

/*
var nombre2="desarrollo"
if (12>11) {
    let nombre = "udem"
    console.log(nombre);
}
console.log(nombre);
*/

// CALLBACKS
/*
const fx_imprimir = (data) => {
    console.log("Hola Mundo", data);
}

const ejecutador = (nombreFuncion, funcion) => {
    console.log("Ejecutar la funcion: " + nombreFuncion);
    console.log();
    funcion(321)
}

ejecutador("funcion de imprimir", fx_imprimir)

ejecutador("Impresión 2", (data)=>{
    console.log("Hola Mundo impresión 2", data);
})
*/
/*
console.log("1");
setTimeout(() => console.log("2"), 200)
setTimeout(() => console.log("3"), 400)
console.log("4");
console.log("-----");*/

/*
Callback Hell
const main = () => {
    console.log("1");
    setTimeout(() => {
        console.log("2")
        setTimeout(() => {
            console.log("3")
            console.log("4")
        }, 400)
    }, 200)
}
main()
*/

// PROMESAS
const conectarDB = () => {
    return new Promise((resolve, reject) => {
        if (1 == 1) {
            resolve({ ok: true, message: "Conectado" })
        } else {
            reject()
        }
    })
}
/*

conectarDB().then((data) => {
    console.log("Conexion ok", data);
    conectarDB().then((data) => {
        conectarDB().then((data) => {
            console.log("Conexion ok", data);
        }).catch((error => {
            console.log("Error al conectar");
        }))
    }).catch((error => {
        console.log("Error al conectar");
    }))
}).catch((error => {
    console.log("Error al conectar");
}))
*/

// ASYN AWAIT
const main = async () => {

    let r1 = await conectarDB()
    let r2 = await conectarDB() // Este depende del primer conectar
    return { r1, r2 }
}

main().then((data) => {
    console.log("Ejecucion finalizada", data);
})