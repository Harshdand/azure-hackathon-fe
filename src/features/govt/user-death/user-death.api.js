import axios from '../../../axios';

export const confirmUserDeath = (dod, id) => {
  return axios({
    method: 'POST',
    url: 'person/death',
    data: { dod, id },
  });
};
