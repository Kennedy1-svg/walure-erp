import axios, { AxiosRequestConfig } from 'axios';
import { useStore } from 'vuex';

const store:any = useStore();

// api helper to fetch data from the backend
export const getData = async (url:any) => {
  try {
    // console.log('token here', token)
    console.log('url here', url)
    const response = await axios.get(`${url}`);
    console.log('response', response)
    return response
  } catch (err) {
    console.log('error', err)
    return err
  }
}

// api helper to fetch data from the backend
export const fetchData = async (url:any, token:any) => {
  try {
    // console.log('token here', token)
    console.log('url here', url)
    const response = await axios.get(`${url}`, { headers: { Authorization: `Bearer ${token}`, ContentType: 'blob' } });
    console.log('response', response)
    return response
  } catch (err) {
    console.log('error', err)
    return err
  }
}

// api helper to fetch data from the backend
export const downloadData = async (title:any, url:any, token:any) => {
  const config:any = { method: 'GET', url, responseType: 'arraybuffer', headers: { Authorization: `Bearer ${token}` }}

  try {
    // console.log('token here', token)
    // console.log('url here', url)
    const response = await axios(config);

    const outputFilename = `${title}.xls`;

    // If you want to download file automatically using link attribute.
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', outputFilename);
    document.body.appendChild(link);
    link.click();

    console.log('response', response)
    return response
  } catch (err) {
    console.log('error', err)
    return err
  }
}

// api helper to fetch data by ID from the backend
export const fetchDataByParams = async (url: any, token:any) => {
  try {
    const response = await axios.get(`${url}`, { headers: { Authorization: `Bearer ${token}` } })
    // console.log('response', response)
    return response
  } catch (err) {
    return err
  }
}

// api helper to add data to the backend
export const addData = async (url: any, data: any = null, token:any) => {
  try {
    const response = await axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } })
    console.log('response', response)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    console.log('response in here is, ', response)
    return response
  } catch (err:any ) {
    console.log('err in here', err, typeof(err))
    console.log('err in here', err.name, typeof(err))
    console.log('err in here', err.title, typeof(err))
    console.log('err in here', err.status, typeof(err))
    console.log('err in here', err.message, typeof(err))
    return err
  }
}

export const addEmptyData = async (url: any, token:any) => {
  try {
    // console.log('token in add empty', token)
    const response = await axios.post(url, { headers: { Authorization: `Bearer ${token}` } })
    console.log('response', response)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    return response
  } catch (err) {
    console.log('err', err)
    return err
  }
}

// const response = await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data'}
//     })

export const addDataFile = async (url: any, data: any, token:any) => {
  try {
    const response = await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`}
  })
    console.log('response', response)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    return response
  } catch (err) {
    console.log('err', err)
    return err
  }
}

// api helper to edit data in the backend
export const editData = async (url: any, payload: any, token:any) => {
  try {
    const response = await axios.patch(url, payload, { headers: { Authorization: `Bearer ${token}` } })
    console.log('response dat we see', response)
    console.log('response in here is, ', response)
    return response
  } catch (err) {
    return err
  }
}

// api helper to edit data in the backend
export const editDataPut = async (url: any, payload: any, token:any) => {
  try {
    const response = await axios.put(url, payload, { headers: { Authorization: `Bearer ${token}` } })
    console.log('response of which', response)
    console.log('response in here is, ', response)
    return response
  } catch (err) {
    return err
  }
}

// api helper to delete data from the backend
export const removeData = async (url: any, token:any) => {
  // console.log('token here', token)
  console.log('url here', url)
  console.log('i am here')

  try {
    const response = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } })
    return response
  } catch (err) {
    return err
  }
}

// api helper to delete data from the backend
export const deleteData = async (url: any, token:any) => {
  // console.log('token here', token)
  console.log('url here', url)
  console.log('i am here')

  try {
    const response = await axios.post(url, { headers: { Authorization: `Bearer ${token}` } })
    return response
  } catch (err) {
    return err
  }
}
