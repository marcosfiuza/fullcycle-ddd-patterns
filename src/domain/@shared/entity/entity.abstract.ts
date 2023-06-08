import Notification from "../../notification/notification";

export default abstract class EntityAbstract {
    protected _id: string;
    public notification: Notification;

    constructor() {
        this.notification = new Notification();
    }
}