// import React from 'react'
// import { AlertIOS } from 'react-native'
// import moment from 'moment'
// var Mailer = require('NativeModules').RNMail
// var RNFS = require('react-native-fs')
//
// createFileContent = (transactions) => {
//   let fileContent = 'Category, Amount, Date, Type, Notes'+'\n'
//
//   for (let i=0; i < transactions.length; i++) {
//     let transaction = transactions[i]
//     let formattedDate = moment(transaction.date).format('DD/MM/YYYY')
//     fileContent += `${transaction.category}, ${transaction.amount}, ${formattedDate}, ${transaction.type}, ${transaction.notes},` + '\n'
//   }
//
//   return fileContent
// }
//
// handleEmail = (path) => {
//   Mailer.mail({
//     subject: 'SpendingApp - transactions CSV',
//     recipients: [''],
//     body: 'Transactions from phone',
//     isHTML: true,
//     attachment: {
//       path: path,
//       type: 'doc',
//       name: 'transactions.csv'
//     }
//   }, (error, event) => {
//       if(error) {
//         AlertIOS.alert('Error', 'Could not send mail')
//       }
//   })
// }
//
// export default onSendEmail = (transactions) => {
//   let path = RNFS.DocumentDirectoryPath + '/transactions.csv'
//   RNFS.writeFile(path, createFileContent(transactions) , 'utf8')
//     .then((success) => {
//       this.handleEmail(path)
//     })
//     .catch((err) => {
//       AlertIOS.alert('Error', 'Could not create file')
//     })
// }
