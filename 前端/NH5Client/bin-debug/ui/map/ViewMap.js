var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewMap = (function () {
    function ViewMap() {
        this.initialized = false;
        this.showBlockList = new List();
        this.mapBlockDic = new Dictionary();
        this.viewMapBg = new egret.Sprite();
        this.rectAngle = new egret.Rectangle(0, 0, Config.w_width, Config.w_height);
    }
    ViewMap.prototype.init = function (mapId, birthPoint) {
        if (!this.initialized) {
            this.initialized = true;
            ViewController.instance.addMapView(this.viewMapBg, 0, 0, "mapBlock");
        }
        this.mapId = mapId;
        var mapInfo = MapModule.getMapInfo(mapId);
        this.viewMapBg.width = mapInfo.width;
        this.viewMapBg.height = mapInfo.height;
        this.mapWith = mapInfo.width;
        this.mapHeight = mapInfo.height;
        this.windowBlockAreaX = Math.ceil(Config.w_width / Config.mapBlockWidth) + 4;
        this.windowBlockAreaY = Math.ceil(Config.w_height / Config.mapBlockHeight) + 4;
        this.createMapBlock();
        this.mapMove(birthPoint, 0);
        ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.PlayState, this.onPlayState, this);
        ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.CreateEntity, this.createEntity, this);
        ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.PlayAtkState, this.PlayAtkState, this);
        ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.RemoveEntity, this.removeEntity, this);
        ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.RoleMove, this.roleMove, this);
    };
    /**清除 */
    ViewMap.prototype.release = function () {
        ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.PlayState, this.onPlayState, this);
        ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.CreateEntity, this.createEntity, this);
        ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.PlayAtkState, this.PlayAtkState, this);
        ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.RemoveEntity, this.removeEntity, this);
        ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.RoleMove, this.roleMove, this);
        this.clearMapBlock();
    };
    //----------------------------------地图单位相关操作以及创建------------------------------------
    //播放状态
    ViewMap.prototype.onPlayState = function (stateEvent) {
        console.log("PlayState---------" + stateEvent.who);
        this.setRoleMovieClip(stateEvent.who, stateEvent.roleClipList);
        this.sortRoleClip();
    };
    //创建实体
    ViewMap.prototype.createEntity = function (createEvent) {
        var viewUnitList = ViewController.instance.getViewGroup(createEvent.who.instanceId);
        if (!!viewUnitList && viewUnitList.count > 0) {
            var gridPt_1 = Utility.gridToPixel(createEvent.pos);
            viewUnitList.forEach(function (viewUnit) {
                viewUnit.x = gridPt_1.x;
                viewUnit.y = gridPt_1.y;
            });
        }
    };
    //播放攻击状态
    ViewMap.prototype.PlayAtkState = function (PlayAtkStateEvent) {
        var _this = this;
        var groupName = PlayAtkStateEvent.who.instanceId + "_" + PlayAtkStateEvent.skillTp.ID;
        ViewController.instance.removeViewGroup(groupName);
        var pos = this.getRoleClipPos(PlayAtkStateEvent.who);
        this.setRoleMovieClip(PlayAtkStateEvent.who, PlayAtkStateEvent.roleClipList, pos, function (objThis, args) {
            _this.setRoleMovieClip(PlayAtkStateEvent.who, PlayAtkStateEvent.roleIdleClipList);
        }, this);
        if (!!PlayAtkStateEvent.skillClip) {
            ViewController.instance.addEffectView(PlayAtkStateEvent.skillClip, pos.x, pos.y, groupName);
            PlayAtkStateEvent.skillClip.startPlay(function (objThis, args) {
                ViewController.instance.removeView(PlayAtkStateEvent.skillClip, true, groupName);
            }, this);
        }
        if (!!PlayAtkStateEvent.flyClip) {
            ViewController.instance.addUnitView(PlayAtkStateEvent.flyClip, pos.x, pos.y, groupName);
            PlayAtkStateEvent.flyClip.startPlay(function (objThis, args) {
                ViewController.instance.removeView(PlayAtkStateEvent.flyClip, true, groupName);
            }, this);
        }
    };
    //移除实体
    ViewMap.prototype.removeEntity = function (removeEntity) {
        ViewController.instance.removeViewGroup(removeEntity.who.instanceId);
    };
    //角色移动
    ViewMap.prototype.roleMove = function (roleMove) {
        var _this = this;
        var viewGroupList = ViewController.instance.getViewGroup(roleMove.who.instanceId);
        if (!!viewGroupList && viewGroupList.count > 0) {
            var toPos = Utility.gridToPixel(roleMove.ptTo);
            viewGroupList.forEach(function (clip) {
                //this.moveDic.add(clip, new MoveAction(clip, toPos, roleMove.moveTime));
                egret.Tween.removeTweens(clip);
                egret.Tween.get(clip, { onChange: _this.sortRoleClip }).to({ x: toPos.x, y: toPos.y }, roleMove.moveTime);
            }, this);
            if (roleMove.who.createSeq == 0)
                this.mapMove(roleMove.ptTo, roleMove.moveTime);
        }
    };
    //对角色动画排序
    ViewMap.prototype.sortRoleClip = function () {
        var unityLayer = ViewController.instance.unitLayer;
        var unitArray = unityLayer.$children;
        unitArray.sort(function (left, right) {
            if (left.y == right.y)
                return 0;
            if (left.y > right.y)
                return 1;
            return -1;
        });
        var i = 0;
        unitArray.forEach(function (unit) { return unityLayer.setChildIndex(unit, i++); });
    };
    //获得角色动画位置
    ViewMap.prototype.getRoleClipPos = function (who) {
        var PixelPos = new egret.Point();
        var viewGroupList = ViewController.instance.getViewGroup(who.instanceId);
        if (!viewGroupList || viewGroupList.count == 0)
            return PixelPos;
        var movieClip = viewGroupList.getItem(0);
        PixelPos.x = movieClip.x;
        PixelPos.y = movieClip.y;
        return PixelPos;
    };
    //设置角色动画
    ViewMap.prototype.setRoleMovieClip = function (who, roleClipList, PixelPos, finishCB, argThis) {
        if (!roleClipList || roleClipList.count == 0)
            return;
        var viewGroupList = ViewController.instance.getViewGroup(who.instanceId);
        var roleClip = roleClipList.getItem(0);
        if (!!viewGroupList && !!viewGroupList.find(function (clip) { return clip.name == roleClip.name; }))
            return;
        if (!PixelPos)
            PixelPos = this.getRoleClipPos(who);
        ViewController.instance.removeViewGroup(who.instanceId);
        roleClipList.forEach(function (clip) {
            ViewController.instance.addUnitView(clip, PixelPos.x, PixelPos.y, who.instanceId);
            clip.startPlay(finishCB, argThis);
        });
    };
    //-----------------------------------地图相关---------------------------------------
    /**加载地图 */
    ViewMap.prototype.loadMap = function (px, py) {
        var topGrid = PosUtils.pixelToGrid(this.rectAngle.x, this.rectAngle.y);
        var p = PosUtils.gridToMapGrid(topGrid.x, topGrid.y);
        var changeBlockList = new List();
        var firstX = p.x - 2, firstY = p.y - 2;
        for (var i = 0; i < this.windowBlockAreaX; i++) {
            for (var j = 0; j < this.windowBlockAreaY; j++) {
                var index = ((firstY < 0 ? 0 : firstY) + i) * this.blockRowCount + ((firstX < 0 ? 0 : firstX) + j);
                var block = this.mapBlockDic.getValue(index);
                changeBlockList.add(block);
            }
        }
        this.changeShowList(changeBlockList);
    };
    /**地图移动 */
    ViewMap.prototype.mapMove = function (gridPoint, moveTime) {
        var rolePixelPoint = PosUtils.gridToPixel(gridPoint.x, gridPoint.y);
        this.rectAngle.x = (rolePixelPoint.x - Config.w_halfWidth);
        this.rectAngle.y = (rolePixelPoint.y - Config.w_halfHiehgt);
        if (this.rectAngle.x < 0) {
            this.rectAngle.x = 0;
        }
        else if (this.rectAngle.x > this.mapWith - this.rectAngle.width) {
            this.rectAngle.x = this.mapWith - this.rectAngle.width;
        }
        if (this.rectAngle.y < 0) {
            this.rectAngle.y = 0;
        }
        else if (this.rectAngle.y > this.mapHeight - this.rectAngle.height) {
            this.rectAngle.y = this.mapHeight - this.rectAngle.height;
        }
        moveTime = moveTime || 0;
        this.loadMap(this.rectAngle.x, this.rectAngle.y);
        var unitLayer = ViewController.instance.unitLayer;
        var effectLayer = ViewController.instance.effectLayer;
        if (moveTime == 0) {
            this.viewMapBg.x = -this.rectAngle.x;
            this.viewMapBg.y = -this.rectAngle.y;
            unitLayer.x = -this.rectAngle.x;
            unitLayer.y = -this.rectAngle.y;
            effectLayer.x = -this.rectAngle.x;
            effectLayer.y = -this.rectAngle.y;
            return;
        }
        // this.moveDic.add(unitLayer, new MoveAction(unitLayer, new egret.Point(-this.rectAngle.x, -this.rectAngle.y), moveTime));
        // this.moveDic.add(effectLayer, new MoveAction(effectLayer, new egret.Point(-this.rectAngle.x, -this.rectAngle.y), moveTime));
        // this.moveDic.add(this.viewMapBg, new MoveAction(this.viewMapBg, new egret.Point(-this.rectAngle.x, -this.rectAngle.y), moveTime));
        egret.Tween.removeTweens(unitLayer);
        egret.Tween.removeTweens(effectLayer);
        egret.Tween.removeTweens(this.viewMapBg);
        egret.Tween.get(unitLayer).to({ x: -this.rectAngle.x, y: -this.rectAngle.y }, moveTime);
        egret.Tween.get(effectLayer).to({ x: -this.rectAngle.x, y: -this.rectAngle.y }, moveTime);
        egret.Tween.get(this.viewMapBg).to({ x: -this.rectAngle.x, y: -this.rectAngle.y }, moveTime);
    };
    /**改变地图块显示列表 */
    ViewMap.prototype.changeShowList = function (changeBlockList) {
        var _this = this;
        this.showBlockList.forEach(function (block) {
            if (!changeBlockList.contains(block)) {
                //显示过后的地图块集合元素 不包含 当前需要显示地图块集合元素   隐藏
                block.loadMapBlock(false);
            }
            else {
                block.loadMapBlock();
            }
        }, this);
        changeBlockList.forEach(function (changeBlock) {
            if (changeBlock && !_this.showBlockList.contains(changeBlock)) {
                //当前显示过后的地图块集合不存在需要显示的地图块集合的元素
                changeBlock.loadMapBlock();
                _this.showBlockList.add(changeBlock);
            }
        }, this);
    };
    /***创建地图格子 */
    ViewMap.prototype.createMapBlock = function () {
        this.blockRowCount = Math.ceil(this.mapHeight / Config.mapBlockHeight);
        var blockColCount = Math.ceil(this.mapWith / Config.mapBlockWidth);
        for (var x = 0; x < blockColCount; x++) {
            for (var y = 0; y < this.blockRowCount; y++) {
                var mapBlock = new MapBlock(x, y, x * this.blockRowCount + y, this.mapId);
                this.viewMapBg.addChild(mapBlock);
                mapBlock.width = Config.mapBlockWidth;
                mapBlock.height = Config.mapBlockHeight;
                mapBlock.x = x * Config.mapBlockWidth;
                mapBlock.y = y * Config.mapBlockHeight;
                this.mapBlockDic.add(mapBlock.Index, mapBlock);
            }
        }
    };
    /**清除地图格子 */
    ViewMap.prototype.clearMapBlock = function () {
        this.mapBlockDic.clear();
        this.viewMapBg.removeChildren();
    };
    return ViewMap;
}());
ViewMap.instance = new ViewMap();
__reflect(ViewMap.prototype, "ViewMap");
var MapBlock = (function (_super) {
    __extends(MapBlock, _super);
    function MapBlock(mx, my, index, mapId) {
        var _this = _super.call(this) || this;
        _this.X = mx;
        _this.Y = my;
        _this.Index = index;
        _this.path = "resource/assets/map/" + mapId + "/" + _this.Y + "_" + _this.X + ".jpg";
        return _this;
    }
    MapBlock.prototype.loadMapBlock = function (isAdd) {
        var _this = this;
        if (isAdd === void 0) { isAdd = true; }
        if (!!this.bitmap) {
            this.bitmap.visible = isAdd;
            return;
        }
        AssetsMgr.instance.loadSinglePicture(this.path, function (bmp) {
            _this.bitmap = bmp;
            _this.addChild(_this.bitmap);
            _this.bitmap.visible = isAdd;
        }, this);
    };
    MapBlock.prototype.destory = function () {
        this.bitmap = null;
    };
    return MapBlock;
}(egret.Sprite));
__reflect(MapBlock.prototype, "MapBlock");
//# sourceMappingURL=ViewMap.js.map