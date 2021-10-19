import {DateTime} from "luxon"

export const day = (dateunformated) => { 
  return DateTime.fromISO(`${dateunformated}`).toFormat('DD');
}

export const seconds = (dateunformated) => { 
  return DateTime.fromISO(`${dateunformated}`).toFormat('X');
}

export const time = (dateunformated) => { 
  return DateTime.fromISO(`${dateunformated}`).toFormat('tt');
}

export const shorthand = (dateunformated) => { 
  let day = DateTime.fromISO(`${dateunformated}`).toFormat('d');
  let month = DateTime.fromISO(`${dateunformated}`).toFormat('LLL');
  let year = DateTime.fromISO(`${dateunformated}`).toFormat('yy');
  let time = DateTime.fromISO(`${dateunformated}`).toFormat('t');

  return `${month} ${day} '${year} at ${time}`;
}