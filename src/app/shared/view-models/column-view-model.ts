export class ColumnViewModel {
    Name: string = "";
    Title: string = "";
    Sortable: boolean = false;
    Selectable: boolean = false;
    constructor(name, title, sortable, selectable) {
        this.Name = name;
        this.Title = title;
        this.Sortable = sortable;
        this.Selectable = selectable;
    }
}