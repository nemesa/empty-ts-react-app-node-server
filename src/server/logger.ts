export class Logger {
    constructor() {

    }

    public Info = (messsage: string, ...args: any[]) => {
        if (args) {
            console.log(messsage, JSON.stringify(args))
        }
        else {
            console.log(messsage)
        }
    }
}