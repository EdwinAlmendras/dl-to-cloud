import puppeteer from 'puppeteer'

import megaRegister from './megaRegister'
import getEmailAndUser from './getEmailAndUser'


async function createMegaAccount(prop) {


  const browser = await puppeteer.launch();

  const pageEmail = await browser.newPage();


  const {
    name,
    lastName,
    email,
    password,
    pathEmail,
    id
  } = await getEmailAndUser(pageEmail)

  await megaRegister(browser)

  await pageEmail.bringToFront();
  await pageEmail.waitFor(2000)

  await confirmEmail(pageEmail, pathEmail, id)


  if (prop) {
    return email+":"+password
  }
  if (!prop) {
    return email
  }
  await browser.close();
}


export default createMegaAccount;