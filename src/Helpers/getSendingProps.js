
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