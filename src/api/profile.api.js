import instance  from "@/api/instance";
const END_POINT = '/api';

const profile = {
    getProfile: () => instance.get(`${END_POINT}/user`),
    updateProfile: (data) => instance.post(`${END_POINT}/user-update`,data),
    updatePsw: (data) => instance.post(`${END_POINT}/password-update`,data),
    myVehicles: () => instance.get(`${END_POINT}/my-sale-vehicles`),
    myRepaires: () => instance.get(`${END_POINT}/my-repairmen`),
    myServices: () => instance.get(`${END_POINT}/user-vehicles`),
    myDrivers: () => instance.get(`${END_POINT}/user-driver-applications`),
    myFavourite: () => instance.get(`${END_POINT}/user-favourites`),
    myShops: () => instance.get(`${END_POINT}/my-shop-items`),
    myOrders: () => instance.get(`${END_POINT}/user-order`),
}


export default {
    profile
}
