import type { AxiosResponse, AxiosError } from 'axios'
import type { _ActionsTree } from 'pinia'
import UseAxios from '../../common/http/ApiService'
const api = new UseAxios()

export const actions: IPolicyActions = {
    async policyCreate(payLoad: object) {
     return api.save('/policy/user/create', payLoad).then((res: AxiosResponse) => res, (err: AxiosError) => err.response)
    },
    async getPolicys(payLoad: object){
       return api.save('/policy/list',payLoad).then((res: AxiosResponse) => res, (err: AxiosError) => err.response)
    },
    async raiseClaim(payLoad: object){
        return api.save('/claim/create',payLoad).then((res: AxiosResponse) => res, (err: AxiosError) => err.response)
    }
}
interface IPolicyActions extends _ActionsTree {
    policyCreate(payLoad: any): Promise< AxiosResponse | undefined>
    getPolicys(payLoad: any): Promise< AxiosResponse | undefined>
    raiseClaim(payLoad: any): Promise< AxiosResponse | undefined>
}
