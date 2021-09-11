import { BehaviorSubject } from 'rxjs';

const loggedInObservable = new BehaviorSubject(0);

const changeLoggedIn = {
    changeNow: function(t){
        loggedInObservable.next(t)
    }
}


export {
    loggedInObservable,
    changeLoggedIn
}