import axios from 'axios';
import store from "@/store";
import Vue from 'vue';
// export const errorCodes = {
//     ERR_401: 401,
//     ERR_402: 402,
//     ERR_403: 403,
//     ERR_404: 404,
//     ERR_412: 412,
//     ERR_422: 422,
//     ERR_423: 423,
//     ERR_500: 500,
// };
function notify(type, message, title, duration = 5000) {
    console.log(type);
    const params = {
      type,
      title: title,
      text: type.message ,
    };

    if (duration) {
      params.duration = duration;
    }

    Vue.prototype.$notify(params);
  }


// function catch422(data) {
//     const response = {
//       error: true,
//       errorType: errorCodes.ERR_422,
//       data,
//     };
//     let errorMessage = '';
//     if (!data.errors) {
//     console.log(data.message)

//       notify( data.message);
//     } else if (Array.isArray(data.errors)) {
//       notify( data.errors[0]);
//     } else if (data.errors) {

//       Object.keys(data.errors).forEach((key) => {

//         errorMessage +=  '<span>'+key +': '+data.errors[key]+ '</span>';
//       });

//       notify(errorMessage);
//     }

//     return response;
//   }
//    function catch401(data) {
//     const response = {
//       error: true,
//       errorType: errorCodes.ERR_401,
//       data: {
//         message: data.message ?? data,
//       },
//     };

//     if (!data.action) {
//       notify(response.data);
//     }
//      store.dispatch('logout');
//   }

function catchDefault(code, data) {
    const response = {
      error: true,
      errorType: code,
      data: {
        message: data.message ?? data,
      },
    };

    if (!data.action) {
      notify({...response.data});
    }

    return response;
}
const instance = axios.create({
    baseURL: (process.env.VUE_APP_SERVER_URL !== undefined) ? process.env.VUE_APP_SERVER_URL : 'https://api.gservice.kz/',
});
instance.interceptors.request.use((config) => {
    const token = store.state.auth.token;
    config.headers = {
        Accept: 'application/json',
        'Content-Language':  (store.state.auth.lang === 'kk') ? 'kz' : store.state.auth.lang,
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
        return config;
    },
    (error) => Promise.reject(error),

);

instance.interceptors.response.use(async(res) => {
    return (res && res.data) || res;
},  (error) => {
    const {
        status,
        data,
    } = error.response;
    switch(status) {
        // case errorCodes.ERR_401: return catch401.call(this, data);
        // case errorCodes.ERR_402: return catch402.call(this, status, data);
        // case errorCodes.ERR_412: return catch412.call(this, data, err);
        // case errorCodes.ERR_422: return catch422.call(this, data);
        default: return catchDefault.call(this, status, data);
    }

});

export default instance;
