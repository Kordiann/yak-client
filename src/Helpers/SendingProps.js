const header = new Headers({
  'Access-Control-Allow-Origin':'*',
  'Content-Type': 'multipart/form-data'
});

export function getSendingProps() {
  let sentData = {
    method: 'GET',
    header: header,
    mode: 'cors',
  }

  return sentData;
}

export function postSendingProps() {
  let sentData = {
    method: 'POST',
    header: header,
    mode: 'cors',
  }

  return sentData;
}