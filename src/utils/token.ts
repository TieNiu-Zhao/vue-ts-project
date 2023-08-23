// 封装本地存取数据与读取数据的方法
// 存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
// 本地存储获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
// 本地存储删除数据
export const DEL_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}