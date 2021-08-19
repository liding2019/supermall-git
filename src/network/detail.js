import {requestLocal} from "./request";

export function getGoodsDetail(id) {
  return requestLocal({
    url:'/goods/detail',
    params:{
      id:id
    }
  })
}
