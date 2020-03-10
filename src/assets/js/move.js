import Axios from "axios";
import { Message } from 'iview'
export function move(url, id, status) {
    return new Promise(resolve => {
        let form = new FormData()
        form.append('id', id)
        form.append('status', status)
        Axios.post(url, form).then(res => {
            if (res.data.code == 0) {
                resolve(res.data.code)
            } else {
                Message.success(res.data.msg)
            }
        })
    })
}