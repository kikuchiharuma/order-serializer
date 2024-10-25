import { SushiCooker } from "./sushiCooker.ts"
import { Order } from "./order.ts"

export class Server {
    sushiCooker: SushiCooker

    constructor () {
        this.sushiCooker = new SushiCooker()
    }

    listener = (demand: string) => {
        return new Promise((resolve) => {
            const order = new Order(demand, resolve)
            this.sushiCooker.add(order)
        })
    }
}