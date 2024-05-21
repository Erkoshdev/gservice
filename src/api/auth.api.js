import instance  from "@/api/instance";
const END_POINT = '/api';

const login = (data) => instance.post(`${END_POINT}/login`, data);
const logout = () =>  instance.post(`${END_POINT}/logout`)
const registration = (data) => instance.post(`${END_POINT}/register`, data);
const sendSms = (data) => instance.post(`${END_POINT}/send-code`, data);
const checkSms = (data) => instance.post(`${END_POINT}/check-code`, data);
const resetPsw = (data) => instance.post(`${END_POINT}/password-reset`, data);
export default {
    login,
    logout,
    registration,
    sendSms,
    checkSms,
    resetPsw

}
