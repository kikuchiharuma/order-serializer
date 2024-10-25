import { Agent } from "./agent.ts";
import { Server } from "./server.ts";
import { assert } from "@std/assert"

Deno.test("server serializes requests from agents", async () => {
    const server = new Server()
    const agentA = new Agent("Agent A", server)
    const agentB = new Agent("Agent B", server)
    const agentC = new Agent("Agent C", server)
    const promises = []

    for (let i = 1; i <= 6; i++) {
        agentA.setDemand(i.toString())
    }

    promises.push(agentA.fulfill())

    for (let i = 1; i <= 4; i++) {
        agentB.setDemand(i.toString())
    }

    promises.push(agentB.fulfill())

    for (let i = 1; i <= 5; i++) {
        agentC.setDemand(i.toString())
    }

    promises.push(
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(agentC.fulfill())
            }, 5000)
        })
    )

    promises.push(
        new Promise((resolve) => {
            setTimeout(() => {
                for (let i = 7; i <= 11; i++) {
                    agentA.setDemand(i.toString())
                }
                
                resolve(agentA.fulfill())
            }, 4000)
        })
    )

    
    const startTime = new Date()

    await Promise.all(promises)
   
    const endTime = new Date()
    const time = endTime.getTime() - startTime.getTime()

    assert(19000 < time && time < 21000)
})