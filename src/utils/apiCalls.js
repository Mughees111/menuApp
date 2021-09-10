const { urls } = require("../utils/Api_urls");
import { doConsole } from "./../utils/functions"

export async function doPost(body_data, url_plus) {

  doConsole(" I request @ " + urls.API + url_plus);
  doConsole(body_data);
  

  var { isError, data } = await fetch(urls.API + url_plus , {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body_data),
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log('response')
      console.log(responseJson)
      return { isError: false, data: responseJson }
    }).catch((error) => {
      return { isError: true, data: {} }
    });
  return { isError, data };
}



export async function apiRequest(body_data, url_plus, ) {
  var url = urls.API;
  // doConsole(" I request @ " + urls.API + url_plus);
  // doConsole(body_data);
  const configs = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body_data),
  }
  // console.log('configs')
  console.log(configs)
  console.log(url + url_plus)
  return (
    fetch(url + url_plus, configs)
      .then((response) => response.json())
      // .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson)
        return responseJson
      }).catch((error) => {
        console.log(error)
        return "No Internet"
      })
  )


  // return {isError,data};
}

  // module.exports.doPost = doPost;