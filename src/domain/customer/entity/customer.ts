import EntityAbstract from "../../@shared/entity/entity.abstract";
import NotificationError from "../../notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends EntityAbstract {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();

        this._id = id;
        this._name = name;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address(): Address {
        return this._address;
    }

    validate(): boolean {
        this.notification.clearErrors();

        if (this.id.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Id is required"
            });
        }

        if (this._name.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            });
        }

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }

        return true;
    }

    changeName(name: string) {
        this._name = name;

        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}