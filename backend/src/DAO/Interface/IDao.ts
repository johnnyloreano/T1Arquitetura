export default interface IDao{
    save(arg0: Object): void;
    getAll(): Object;
    update(oldObj: Object , newObj: Object): void;
    delete(arg0: Object): void;
}
