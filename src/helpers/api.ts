import axios from 'axios'

// api helper to fetch data from the backend
export const fetchData = async (url:any, token:any) => {
  try {
    const response = await axios.get(`${url}`, { headers: { Authorization: `Bearer ${token}` } });
    console.log('response', response)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to fetch data by ID from the backend
export const fetchDataByParams = async (url: any) => {
  try {
    const response = await axios.get(`${url}`, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    return response.data.data
  } catch (err) {
    return err
  }
}

// api helper to add data to the backend
export const addData = async (url: any, data: any) => {
  try {
    const response = await axios.post(url, data, {headers: {
             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         }
      }
    )
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to edit data in the backend
export const editData = async (url: any, payload: any) => {
  try {
    const response = await axios.put(url, payload)
    return response.data
  } catch (err) {
    return err
  }
}

// api helper to delete data from the backend
export const removeData = async (url: any) => {
  try {
    const response = await axios.delete(`${url}`)
    return response.data
  } catch (err) {
    return err
  }
}
