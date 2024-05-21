import instance  from "@/api/instance";
const END_POINT = '/api';

const filter = {
    getVehicles: () => instance.get(`${END_POINT}/vehicle-types`),
    getMarks: () => instance.get(`${END_POINT}/marks`),
    getFuels: () => instance.get(`${END_POINT}/fuel-types`),
    getVehicleStatus: () => instance.get(`${END_POINT}/vehicle-statuses`),
    getRegions: () => instance.get(`${END_POINT}/areas?region_only=1`),
    getAreas: () => instance.get(`${END_POINT}/areas`),
    getProducts: (data) => instance.get(`${END_POINT}/sale-vehicles`, data),
    getProfessions: () => instance.get(`${END_POINT}/professions`),
    getRepairs: (data) => instance.get(`${END_POINT}/repairmens`, data),
    getShopCategories: () => instance.get(`${END_POINT}/categories`),
    getCountries: () => instance.get(`${END_POINT}/countries`),
    getShop: (data) => instance.get(`${END_POINT}/shop-items`, data),
    getOrderTypes: () => instance.get(`${END_POINT}/order-types`),
    getOrders: (data) => instance.get(`${END_POINT}/orders`, data),
    getServices: (data) => instance.get(`${END_POINT}/vehicles`, data),
    getOperators: (data) => instance.get(`${END_POINT}/driver-applications`, data),
    getUserVehicles: (data) => instance.get(`${END_POINT}/user-vehicles`, data),
}


export default {
    filter
}
