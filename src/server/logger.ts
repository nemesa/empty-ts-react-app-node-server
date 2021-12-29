export class Logger {
    public Info = (messsage: string, ...args: Array<any>) => {
        if (args) {
            console.log(messsage, JSON.stringify(args))
        }
        else {
            console.log(messsage)
        }
    }
}