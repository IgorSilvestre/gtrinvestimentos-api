// import {sheetToObject} from "/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/utils/sheetToObject.js"

// import {arrIncludeRegex} from "/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/utils/arrIncludeRegex.js"

// import {normalizedPeople} from "/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/people/NormalizePeople.js"


// sheetToObject('Pessoas').forEach((pessoa,i)=> {
//   const areaAtuacao = (''+pessoa.AreaAtuacao).split(',')
//   const addToArrOfAreaAtuacao = []

// // Ajeitando os V na areaDeAtuacao

//   for(let keyPessoa in pessoa){
//     const valueKeyPessoa =pessoa[keyPessoa]
//     if  (valueKeyPessoa !== 'V') continue

//     addToArrOfAreaAtuacao.push(keyPessoa)
//     addToArrOfAreaAtuacao.forEach(columKey =>{
//       if(!arrIncludeRegex(columKey,areaAtuacao)){
//         areaAtuacao.push(columKey)
//       }
//     })
//   }

//   //ajeitando os emails
//   const {Email1,Email2} = pessoa
//   const emails = [Email1 , Email2]

//   //ajeitando os telefones
//   const {Telefone1,Telefone2,Telefone3} = pessoa
//   const telefones = [Telefone1,Telefone2,Telefone3]

//   // criando objFormatado
//   const {Nome,Empresa,AreaAtuacao,OqueBuscao} = pessoa

//   // console.log(normalizedPeople(Nome,Empresa,emails,telefones,AreaAtuacao,OqueBuscao))

// })

