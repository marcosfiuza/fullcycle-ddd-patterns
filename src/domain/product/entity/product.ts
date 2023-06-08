import EntityAbstract from "../../@shared/entity/entity.abstract";
import NotificationError from "../../notification/notification.error";

export default class Product extends EntityAbstract {
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();

        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    get id() {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    validate(): boolean {
        this.notification.clearErrors();

        if (this._id.length === 0) {
            this.notification.addError({
                context: "product",
                message: "Id is required"
            });
        }

        if (this._name.length === 0) {
            this.notification.addError({
                context: "product",
                message: "Name is required"
            });
        }

        if (this._price <= 0) {
            this.notification.addError({
                context: "product",
                message: "Price must be greater than 0"
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

    changePrice(price: number) {
        this._price = price;

        this.validate();
    }
}