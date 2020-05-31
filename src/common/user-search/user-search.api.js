import axios from '../../axios';

export const userSearch = (params) => {
  let { pan = '', aadhaar = '', id = '' } = params;

  aadhaar = aadhaar.replace(/-/g, '');
  aadhaar = aadhaar.replace(/_/g, '');

  const payloadParams = {};

  if (pan) {
    payloadParams.pan = pan;
  }

  if (aadhaar) {
    payloadParams.aadhaar = aadhaar;
  }

  if (id) {
    payloadParams.id = id;
  }

  return axios({
    method: 'GET',
    url: 'person',
    params: payloadParams,
  });
};
