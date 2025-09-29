import type { AxiosResponse, AxiosError } from 'axios'
import type { _ActionsTree } from 'pinia'
import UseAxios from '../../common/http/ApiService'
const api = new UseAxios()

export const actions: IClaimActions = {
  async fetchClaims(payLoad: object) {
    return api.save('/claim/list', payLoad).then((res: AxiosResponse) => res, (err: AxiosError) => err.response)
  },
  async fetchRemarks(claimId: number) {
    return api.findAll(`/claim/remarks/history/${claimId}`).then((res: AxiosResponse) => res, (err: AxiosError) => err.response)
  },
  async addRemark(payLoad: object) {
    return api.save('/claim/create/remark', payLoad).then((res: AxiosResponse) => res, (err: AxiosError) => err.response)
  },
  async updateStatus(payLoad: object) {
    return api.update('/claim/update/status', payLoad).then((res: AxiosResponse) => res, (err: AxiosError) => err.response)
  }
}
interface IClaimActions extends _ActionsTree {
    fetchClaims(payLoad: any): Promise< AxiosResponse | undefined>
    fetchRemarks(claimId: number): Promise< AxiosResponse | undefined>
    addRemark(payLoad: object): Promise< AxiosResponse | undefined>
    updateStatus(payLoad: object): Promise< AxiosResponse | undefined>
}