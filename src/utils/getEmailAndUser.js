import faker from 'faker'
import md5 from 'md5'
import axios from 'axios'


let pathEmail;

const getEmailAndUser = async(pageEmail, haveHash) => {


  let email,
  password,
  name,
  lastName;


  const urlEmail =
  'https://www.fakemailgenerator.net/'
  await pageEmail.goto(urlEmail,
    {
      waitUntil: "networkidle0",
    });
  email = await pageEmail.$eval('#active-mail',
    el =>
    el.getAttribute('data-clipboard-text'))

  //Conditional props
  name = faker.name.firstName()
  lastName = faker.name.lastName()
  if (haveHash) {
    password = md5(email)

  } else {
    password = email

  }


  //search => //email//@some.com
  pathEmail = email.replace(/\@(.*)/g,
    "")

  const idEmail = await getEmailId(pathEmail)


  return {
    name,
    lastName,
    email,
    password,
    pathEmail,
    idEmail
  }

}
async function getEmailId(pathEmail) {
  try {
    const response = await
    axios.get('https://www.fakemailgenerator.net/api/v1/mailbox/'
      + pathEmail);
    const emails = response.data
    return emails[0].id
  } catch (error) {
    console.error(error);
  }
}



export default getEmailAndUser