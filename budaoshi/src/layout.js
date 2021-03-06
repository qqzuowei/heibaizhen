/**
 * Created by chenyuliang01 on 2015/7/31.
 */

/**
 * add center menu item
 * @param layer
 * @param text
 * @param fontType
 * @param fontSize
 * @param height
 * @param onTouch
 * @returns {cc.MenuItemLabel}
 */
function addCenterJumpMenu(layer, text, fontType, fontSize, height, onTouch)
{
    var easyLabel = new cc.LabelTTF(text, fontType, fontSize);
    easyLabel.color = cc.color(0,0,0,255);
    var easyItem = new SoundMenuItemLabel(easyLabel,onTouch,layer);
    easyItem.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2 + height));

    return easyItem;
}

/**
 * add bottom menu item
 * @param layer
 * @param {String} text
 * @param {Number} x
 * @param {Function} onTouch
 * @param {String} [fontType]
 * @param {String} [fontSize]
 * @param {cc.color} [fontColor]
 * @returns {cc.MenuItemLabel}
 */
function addBottomMenu(layer, text, x, onTouch, fontType, fontSize, fontColor)
{
    fontType = fontType ? fontType : "微软雅黑";
    fontSize = fontSize ? fontSize : 35;
    fontColor = fontColor ? fontColor : cc.color(0,0,0,255);

    var easyLabel = new cc.LabelTTF(text, fontType, fontSize);
    easyLabel.color = cc.color(0,0,0,255);
    var easyItem = new SoundMenuItemLabel(easyLabel, onTouch, layer);
    easyItem.setPosition(cc.p(cc.winSize.width/2 + x, 6 + easyLabel.height / 2));

    return easyItem;
}

/**
 * show a dialog
 * @param layer
 * @param {Array} textList each text format is {content:,style:,size,color:,height}
 * @param {Array} menuList each menu format is {content:,size:,color:,bgColor:,cb:,x:}
 * @param [touchDisappear] whether disappear when touch screen
 */
function showDialogMenu(layer, textList, menuList, touchDisappear)
{
    //1. create back layer to cover main layer
    var dialogLayer = new cc.LayerColor(cc.color(0,0,0,120));
    cc.eventManager.addListener(cc.EventListener.create({
        event : cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches : true,
        onTouchBegan : function(){
            return true;
        },
        onTouchEnded : function(){
            if (touchDisappear)
                dialogLayer.removeFromParent(true);
        }
    }), dialogLayer);

    var dialogBG = new cc.Sprite(res.Dialog_png);
    dialogBG.attr({
        x : cc.winSize.width/2,
        y : cc.winSize.height/2,
        scale : 1.2
    });
    dialogLayer.addChild(dialogBG, 0);

    //2. add text
    var topHeight = dialogBG.height - 80;
    textList.forEach(function(t){
        var textLabel = new cc.LabelTTF(t.content, t.style, t.size);
        textLabel.attr({
            color : t.color,
            y : topHeight - t.height,
            x : dialogBG.width/2
        });

        dialogBG.addChild(textLabel, 0);
    });

    //3. add menu list
    var itemList = [];
    menuList.forEach(function(m){
        var menuLabel = new cc.LabelTTF(m.content, "微软雅黑", m.size ? m.size : 28);
        menuLabel.color = m.color;
        var menuItem = new SoundMenuItemLabel(menuLabel, m.cb.bind(this, dialogLayer), dialogBG);
        menuItem.setPosition(cc.p(dialogBG.width/2 + m.x, 35 + menuLabel.height / 2));


        itemList.push(menuItem);
    });
    var dialogMenu = cc.Menu.create.apply(cc.Menu, itemList);
//    dialogMenu.initWithItems(itemList);
    dialogMenu.setPosition(cc.p(0, 0));
    dialogBG.addChild(dialogMenu);

    layer.addChild(dialogLayer, 5);
}