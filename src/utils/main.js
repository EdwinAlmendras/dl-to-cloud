import inquirer from 'inquirer'
import moment from 'moment'

import createPaste from './pastebin'
import createMegaAccount from './createMegaAccount'



let questions = [{
  type: "number",
  name: "accts",
  message: "Which accounts can you create?",
  default: 1
  },
  {
    type: "confirm",
    name: "question",
    message: "You can hash password(email)?"
  }]

  const main = async () => {

    const answers = await inquirer.prompt(questions)


    //Answers
    let numberOfAccounts = answers.accts
    let res = answers.question


    let megaAccounts = '';
    let accountMega;

    console.log('creating mega accounts.. please wait')


    for (let i = 0; i < numberOfAccounts; i++) {

      if (res) {
        accountMega = await
        createMegaAccount(true)
      } else {
        accountMega = await
        createMegaAccount(false)
      }
      megaAccounts += accountMega + '\n'
    }


    let dateFormat = await moment().format('MMMM YYYY, h: mm: ss a')
    let link;

    try {
      link = await createPaste(megaAccounts, dateFormat)
    }
    catch(err) {
      console.log('something wrong saving to pastebin')

    }


    console.log('sucess saved\n link:', link)
  }


  export default main;