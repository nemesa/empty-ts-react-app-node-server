import {MyClass} from './my-class'

export class MyApp {

    public onLoaded = (): void => {
        console.log("on App.onLoaded");
        (new MyClass()).sayHi()
    }
}
console.log('add App to globalThis')
globalThis.MyApp = MyApp