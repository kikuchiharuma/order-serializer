import { Server } from "./server.ts";

export class Agent {
    name: string
    server: Server
    demands: string[]

    constructor (_name: string, _server: Server) {
        this.name = _name
        this.server = _server
        this.demands= []
    }

    setDemand = (demand: string) => {
        this.demands.push(this.name + " order " + demand)
    }

    fulfill = async () => {
        const promises = []

        while (this.demands.length > 0) {
            const demand = this.demands[0]
            promises.push(this.server.listener(demand))
            this.demands.shift()
        }

        const responses = await Promise.all(promises)

        return responses
    }
}