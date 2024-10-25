export class Order {
    public demand: string
    private callback: (nigiri: string) => void
    
    constructor (_demand: string, _callback: (nigiri: string) => void) {
        this.demand = _demand
        this.callback = _callback
    }

    deliver = (nigiri: string) => {
        this.callback(nigiri)
    }
}