
export interface IPlayerDat {
    x: number;
    y: number;
    sid: number;
    dir: number;
    obj: number;
    wep: number;
    variant: number;
    tribe: string;
    isLeader: boolean;
    hat: number;
    acc: number;
    isSkull: boolean;
    zIndex: number;
}

export class Player implements IPlayerDat{
    x: number = -2;
    y: number = -2;
    sid: number = -2;
    id: string = "NULL";
    dir: number = 0;
    obj: number = -2;
    wep: number = -2;
    variant: number = -2;
    tribe: string = "NULL";
    isLeader: boolean = false;
    hat: number = -2;
    acc: number = -2;
    isSkull: boolean = false;
    zIndex: number = -1;

    assign(dat: IPlayerDat) {
        this.x = dat.x;
        this.y = dat.y;
        this.sid = dat.sid;
        this.dir = dat.dir;
        this.obj = dat.obj;
        this.wep = dat.wep;
        this.variant = dat.variant;
        this.tribe = dat.tribe;
        this.isLeader = dat.isLeader;
        this.hat = dat.hat;
        this.acc = dat.acc;
        this.isSkull = dat.isSkull;
        this.zIndex = dat.zIndex;
    }
}