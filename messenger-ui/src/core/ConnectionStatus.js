class ConnectionState{
    constructor(State) {
        this.State = State;
    }
}

class Connected extends ConnectionState{
    constructor() {
        super('Connected');
    }
}
class Connecting extends ConnectionState{
    constructor() {
        super('Connecting');
    }
}
class Disconnected extends ConnectionState{
    constructor() {
        super('Disconnected');
    }
}

export class ConnectionStatus{
    static Connected = new Connected();
    static Connecting = new Connecting();
    static Disconnected = new Disconnected();
}
