import axios from 'axios';
import { useStore } from 'vuex';

const store:any = useStore();

// api helper to fetch data from the backend
export const fetchData = async (url:any, token:any) => {
  try {
    console.log('token here', token)
    console.log('url here', url)
    const response = await axios.get(`${url}`, { headers: { Authorization: `Bearer ${token}` } });
    // console.log('response', response)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to fetch data by ID from the backend
export const fetchDataByParams = async (url: any, token:any) => {
  try {
    const response = await axios.get(`${url}`, { headers: { Authorization: `Bearer ${token}` } })
    // console.log('response', response.data)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to add data to the backend
export const addData = async (url: any, data: any, token: any = null) => {
  try {
    const response = await axios.post(url, data, { headers: {
      Authorization: `Bearer ${token}` } 
    })
    console.log('response', response.data)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    return response.data
  } catch (err) {
    console.log('err', err)
    return err
  }
}

export const addDataFile = async (url: any, data: any, token: any = null) => {
  try {
    const response = await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}` } 
    })
    console.log('response', response.data)
    // setTimeout(() => {
    //   store.dispatch()
    // })
    return response.data
  } catch (err) {
    console.log('err', err)
    return err
  }
}

// api helper to edit data in the backend
export const editData = async (url: any, payload: any, token: any) => {
  try {
    const response = await axios.patch(url, payload, { headers: {
    Authorization: `Bearer ${token}` } 
  })
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to edit data in the backend
export const editDataFile = async (url: any, payload: any, token: any) => {
  try {
    const response = await axios.patch(url, payload, { headers: { 'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}` } 
  })
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to delete data from the backend
export const removeData = async (url: any, token:any) => {
  console.log('token here', token)
  console.log('url here', url)
  console.log('i am here')

  try {
    const response = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } 
  })
    return response.data
  } catch (err) {
    return err
  }
}
