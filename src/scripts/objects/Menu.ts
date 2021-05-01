import MenuItem from "./MenuItem";

export default class Menu extends Phaser.GameObjects.Container {
    menuItems: MenuItem[];
    menuItemIndex: number;
    heroes: any;
    selected: boolean;
    
    constructor (x, y, scene) {
        super(scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        //this.heroes = heroes;
        this.x = x;
        this.y = y;
        this.selected = false;
    }

    addMenuItem(unit) {
        var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);        
    }

    moveSelectionUp() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    }

    moveSelectionDown() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    }

    // select the menu as a whole and an element with index from it
    select(index) {
        if(!index)
            index = 0;

        if (this.menuItems[this.menuItemIndex] != null) {
            this.menuItems[this.menuItemIndex].deselect();
        }
        this.menuItemIndex = index;
        if (this.menuItems[this.menuItemIndex] != null) {
            this.menuItems[this.menuItemIndex].select();
        }
        this.selected = true;
    }

    getMenuItemIndex() {
        return this.menuItemIndex;
    }

    // deselect this menu
    deselect() {        
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
        this.selected = false;
    }

    confirm() {
        // wen the player confirms his slection, do the action
    }

    clear() {
        for(var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }

    remap(units) {
        this.clear();        
        for(var i = 0; i < units.length; i++) {
            var unit = units[i];
            this.addMenuItem(unit.type);
        }
    }
}