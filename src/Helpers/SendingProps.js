export function getSendingProps() {
    let header = new Headers({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'multipart/form-data'
    });

    let sentData = {
      method: 'GET',
      header: header,
      mode: 'cors',
    }

    return sentData;
}

export function postSendingProps() {
  let header = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'multipart/form-data'
  });

  let sentData = {
    method: 'POST',
    header: header,
    mode: 'cors',
  }

  return sentData;
}