// const env: string = process.env.NODE_ENV || 'development'
const env = 'development'

const ips = {
  development: {
    baseUrl: 'http://152.136.185.210:5000'
  }
}
const ipConfig = ips[env as keyof typeof ips]
export default ipConfig
