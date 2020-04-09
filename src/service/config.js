const devURL = "http://localhost:3000"; // 开发环境，需要开启mock server（执行：gulp mock）
// const devURL = "https://www.easy-mock.com/mock/5c90765427f7cd15bd94be45/api"; // 开发环境，easy-mock，真机调试时切换
const prodURL = "TODO"; // 生产环境，线上服务器

console.log(process.env.NODE_ENV);
const BASE_URL = process.env.NODE_ENV === 'development' ? devURL : prodURL;
console.log(BASE_URL);

export default BASE_URL;
