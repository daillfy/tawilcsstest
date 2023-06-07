import axios from 'axios'

// config

// ----------------------------------------------------------------------

declare global {
  interface Window {
    token: string
  }
}

const axiosInstance = axios.create({
  baseURL: 'https://chat-api.withcontext.ai/v1',
})
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window?.token}`
  config.headers['Content-Type'] = config.headers['Content-Type']
    ? config.headers['Content-Type']
    : 'application/json'
  config.headers.Authorization =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJ4Q2pQSnFGNDZKUzNWX01rMGxoNCJ9.eyJnaXZlbl9uYW1lIjoiZGFpbGx5IiwiZmFtaWx5X25hbWUiOiJsdWNreSIsIm5pY2tuYW1lIjoiZGFpbHlsdWNreTg4IiwibmFtZSI6ImRhaWxseSBsdWNreSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRlbFRmX2VjN3ZWMENYTlI1aXM1U2s2SExGMHR6bkFVNnJiS180aT1zOTYtYyIsImxvY2FsZSI6InpoLUNOIiwidXBkYXRlZF9hdCI6IjIwMjMtMDYtMDVUMDc6MjI6MDkuNjEzWiIsImVtYWlsIjoiZGFpbHlsdWNreTg4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGgud2l0aGNvbnRleHQuYWkvIiwiYXVkIjoiTlh3c01Fb3pwWElzWVI3Z3hvWUZtUlNYVnU2bXpLREkiLCJpYXQiOjE2ODYwMzk0MDIsImV4cCI6MTY4OTYzOTQwMiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDA5MTU4MjQwNTI2OTk4NTAzNjAiLCJzaWQiOiJUTU1xSnhZQm82ZFVMempGbWEzTFI5X1VHSjdMOFBadSIsIm5vbmNlIjoiTFRGMk1tUmtPRnBEVWkxT0xYQXlVRU4wWW1weWJHbGZaVlZLVG5SR2FHaHNOVzR5UzNKdE9XcERXUT09In0.tiKOyHgr2YXuzKxLlaB6DVOXUtbTQq69aTLoIsi9FzGarx4t_-tFYtOlb_Gq4-6SWQFVUjjH9ySZAhLp9MGgLcKQwDPD2ok6ZECYRWlZGeIozwKpTWDLyr81dvoxi2cdwWH1aGEiTn4ZIZXiQGhOBukwUnbjia6NnoImGBEnnw5DpUKofwaHE03MJg0FmdHGCwuXsZQwJR_Sua1S9vKf8JHqp36xnevgIxFTPYuDzmOiGZOs1SxQStnbBYJA2ds_pcMIrYrnTC23pluJBuLrkMpwFpHTEA5EVKDbGpLx_Rc8On4UNQRnyR-N9KXqTbRkJwd9syqelFmsMlXeOFjcvg'
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
)

export default axiosInstance
