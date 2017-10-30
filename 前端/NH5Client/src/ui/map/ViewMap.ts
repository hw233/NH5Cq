class ViewMap {
	public static readonly instance:ViewMap = new ViewMap();
	private mapBlockDic:Dictionary<number,MapBlock>;
	private rectAngle:egret.Rectangle;
	private viewMapBg:egret.Sprite;
	private blockRowCount:number;
	private mapWith:number;
	private mapHeight:number;
	private windowBlockAreaX:number;
	private windowBlockAreaY:number;
	private showBlockList:List<MapBlock>;
	private mapId:number;
	private initialized:boolean = false;
	public constructor() {
		this.showBlockList = new List<MapBlock>();
		this.mapBlockDic = new Dictionary<number,MapBlock>();
		this.viewMapBg = new egret.Sprite();
		this.rectAngle = new egret.Rectangle(0,0,Config.w_width,Config.w_height);
	}
	public init(mapId:number,birthPoint:egret.Point):void{
		if(!this.initialized){
			this.initialized = true;
			ViewController.instance.addMapView(this.viewMapBg,0,0,"mapBlock");
		}
		this.mapId = mapId;
		var mapInfo:MapModule.MapInfo = MapModule.getMapInfo(mapId);
		this.viewMapBg.width = mapInfo.width;
		this.viewMapBg.height = mapInfo.height;
		this.mapWith = mapInfo.width;
		this.mapHeight = mapInfo.height;
		this.windowBlockAreaX = Math.ceil(Config.w_width/Config.mapBlockWidth)+4;
		this.windowBlockAreaY = Math.ceil(Config.w_height/Config.mapBlockHeight)+4;
		this.createMapBlock();

		this.mapMove(birthPoint, 0);

		ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.PlayState, this.onPlayState, this);
		ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.CreateEntity, this.createEntity, this);
		ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.PlayAtkState, this.PlayAtkState, this);
		ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.RemoveEntity, this.removeEntity, this);
		ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.RoleMove, this.roleMove, this);
	}

	/**清除 */
	public release():void
	{
		ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.PlayState, this.onPlayState, this);
		ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.CreateEntity, this.createEntity, this);
		ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.PlayAtkState, this.PlayAtkState, this);
		ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.RemoveEntity, this.removeEntity, this);
		ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.RoleMove, this.roleMove, this);

		this.clearMapBlock();
	}

	//----------------------------------地图单位相关操作以及创建------------------------------------

	//播放状态
	private onPlayState(stateEvent:PlayStateEvent):void
	{
		console.log("PlayState---------"+stateEvent.who)

		this.setRoleMovieClip(stateEvent.who, stateEvent.roleClipList);

		this.sortRoleClip();
	}

	//创建实体
	private createEntity(createEvent:CreateEntityEvent):void
	{
		var viewUnitList = ViewController.instance.getViewGroup(createEvent.who.instanceId);
		if (!!viewUnitList &&　viewUnitList.count > 0)
		{
			let gridPt = Utility.gridToPixel(createEvent.pos);
			viewUnitList.forEach(viewUnit =>
			{
				viewUnit.x = gridPt.x;
				viewUnit.y = gridPt.y;
			});
		}
	}

	//播放攻击状态
	private PlayAtkState(PlayAtkStateEvent:PlayAtkStateEvent):void
	{
		var groupName = PlayAtkStateEvent.who.instanceId + "_" + PlayAtkStateEvent.skillTp.ID

		ViewController.instance.removeViewGroup(groupName);

		var pos = this.getRoleClipPos(PlayAtkStateEvent.who);

		this.setRoleMovieClip(PlayAtkStateEvent.who, PlayAtkStateEvent.roleClipList, pos, (objThis:ViewMap, args:any[]) =>
		{
			this.setRoleMovieClip(PlayAtkStateEvent.who, PlayAtkStateEvent.roleIdleClipList);
		}, this);

		if (!!PlayAtkStateEvent.skillClip)
		{
			ViewController.instance.addEffectView(PlayAtkStateEvent.skillClip, pos.x, pos.y, groupName);
			PlayAtkStateEvent.skillClip.startPlay<ViewMap>((objThis:ViewMap, args:any[]) =>
			{
				ViewController.instance.removeView(PlayAtkStateEvent.skillClip, true, groupName);
			}, this);
		}

		if (!!PlayAtkStateEvent.flyClip)
		{
			ViewController.instance.addUnitView(PlayAtkStateEvent.flyClip, pos.x, pos.y, groupName);
			PlayAtkStateEvent.flyClip.startPlay<ViewMap>((objThis:ViewMap, args:any[]) =>
			{
				ViewController.instance.removeView(PlayAtkStateEvent.flyClip, true, groupName);
			}, this);
		}
	}

	//移除实体
	private removeEntity(removeEntity:RemoveEntityEvent):void
	{
		ViewController.instance.removeViewGroup(removeEntity.who.instanceId);
	}

	//角色移动
	private roleMove(roleMove:RoleMoveEvent):void
	{
		var viewGroupList = ViewController.instance.getViewGroup(roleMove.who.instanceId);
		if (!!viewGroupList && viewGroupList.count > 0)
		{
			var toPos = Utility.gridToPixel(roleMove.ptTo);

			viewGroupList.forEach(clip =>
			{ 
				//this.moveDic.add(clip, new MoveAction(clip, toPos, roleMove.moveTime));
				egret.Tween.removeTweens(clip);
				egret.Tween.get(clip, { onChange:this.sortRoleClip }).to({ x:toPos.x, y:toPos.y },  roleMove.moveTime);

			}, this);

			if (roleMove.who.createSeq == 0)
				this.mapMove(roleMove.ptTo, roleMove.moveTime);
		}
	}

	//对角色动画排序
	private sortRoleClip():void
	{
		var unityLayer = ViewController.instance.unitLayer;
		var unitArray = unityLayer.$children;

		unitArray.sort((left, right) =>
		{
			if (left.y == right.y)
				return 0;

			if (left.y > right.y)
				return 1;

			return -1;
		});

		var i:number = 0;
		unitArray.forEach(unit => unityLayer.setChildIndex(unit, i++));
	}

	//获得角色动画位置
	private getRoleClipPos(who:Entity):egret.Point
	{
		var PixelPos = new egret.Point();

		var viewGroupList = ViewController.instance.getViewGroup(who.instanceId);
		if (!viewGroupList || viewGroupList.count == 0)
			return PixelPos;

		var movieClip = viewGroupList.getItem(0);
		PixelPos.x = movieClip.x;
		PixelPos.y = movieClip.y;

		return PixelPos;
	}

	//设置角色动画
	private setRoleMovieClip(who:Entity, roleClipList:List<MovieClip>, PixelPos?:egret.Point, finishCB?:(objThis:ViewMap, args:any[])=>void, argThis?:any):void
	{
		if (!roleClipList || roleClipList.count == 0)
			return;

		var viewGroupList = ViewController.instance.getViewGroup(who.instanceId);
		var roleClip = roleClipList.getItem(0);
		if (!!viewGroupList && !!viewGroupList.find(clip => clip.name == roleClip.name))
			return;

		if (!PixelPos)
			PixelPos = this.getRoleClipPos(who);

		ViewController.instance.removeViewGroup(who.instanceId);

		roleClipList.forEach(clip =>
		{
			ViewController.instance.addUnitView(clip, PixelPos.x, PixelPos.y, who.instanceId);
			clip.startPlay<ViewMap>(finishCB, argThis);
		});
	}

	//-----------------------------------地图相关---------------------------------------
	/**加载地图 */
	private loadMap(px:number, py:number)
	{   
		var topGrid:egret.Point = PosUtils.pixelToGrid(this.rectAngle.x, this.rectAngle.y);
		var p = PosUtils.gridToMapGrid(topGrid.x, topGrid.y);
		var changeBlockList:List<MapBlock> = new List<MapBlock>();
		var firstX = p.x - 2,firstY = p.y - 2;
		for(var i:number = 0;i<this.windowBlockAreaX;i++){
			for(var j:number =0 ;j<this.windowBlockAreaY;j++){
				var index:number = ((firstY<0?0:firstY)+i)*this.blockRowCount+((firstX<0?0:firstX)+j);
				var block:MapBlock = this.mapBlockDic.getValue(index);
				changeBlockList.add(block);
			}
		}
		this.changeShowList(changeBlockList);
	}
	/**地图移动 */
	public mapMove(gridPoint:egret.Point, moveTime?:number):void{
		var rolePixelPoint:egret.Point = PosUtils.gridToPixel(gridPoint.x,gridPoint.y);
		this.rectAngle.x = (rolePixelPoint.x - Config.w_halfWidth);
		this.rectAngle.y = (rolePixelPoint.y - Config.w_halfHiehgt);
		if(this.rectAngle.x < 0){
			this.rectAngle.x = 0;
		}else if(this.rectAngle.x > this.mapWith - this.rectAngle.width){
			this.rectAngle.x = this.mapWith - this.rectAngle.width;
		}
		if(this.rectAngle.y < 0){
			this.rectAngle.y = 0;
		}else if(this.rectAngle.y > this.mapHeight - this.rectAngle.height){
			this.rectAngle.y = this.mapHeight - this.rectAngle.height;
		}

		moveTime = moveTime || 0;
		this.loadMap(this.rectAngle.x, this.rectAngle.y);

		var unitLayer = ViewController.instance.unitLayer;
		var effectLayer = ViewController.instance.effectLayer;

		if (moveTime == 0)
		{
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
		egret.Tween.get(unitLayer).to({ x:-this.rectAngle.x, y:-this.rectAngle.y }, moveTime);
		egret.Tween.get(effectLayer).to({ x:-this.rectAngle.x, y:-this.rectAngle.y }, moveTime);
		egret.Tween.get(this.viewMapBg).to({ x:-this.rectAngle.x, y:-this.rectAngle.y }, moveTime);
	}
	/**改变地图块显示列表 */
	private changeShowList(changeBlockList:List<MapBlock>):void{
		this.showBlockList.forEach((block:MapBlock)=>{
			if(!changeBlockList.contains(block)){
				//显示过后的地图块集合元素 不包含 当前需要显示地图块集合元素   隐藏
				block.loadMapBlock(false);
			}else{
				block.loadMapBlock();
			}
		},this);
		changeBlockList.forEach((changeBlock:MapBlock)=>{
			if(changeBlock && !this.showBlockList.contains(changeBlock)){
				//当前显示过后的地图块集合不存在需要显示的地图块集合的元素
				changeBlock.loadMapBlock();
				this.showBlockList.add(changeBlock);
			}
		},this);
	}
	/***创建地图格子 */
	private createMapBlock():void{
		this.blockRowCount = Math.ceil(this.mapHeight/Config.mapBlockHeight);
		var blockColCount:number = Math.ceil(this.mapWith/Config.mapBlockWidth);
		for(var x:number = 0; x < blockColCount; x++)
		{
			for(var y:number = 0; y < this.blockRowCount; y++)
			{
				var mapBlock:MapBlock = new MapBlock(x, y, x * this.blockRowCount + y,this.mapId);
				this.viewMapBg.addChild(mapBlock);
				mapBlock.width = Config.mapBlockWidth;
				mapBlock.height = Config.mapBlockHeight;
				mapBlock.x = x*Config.mapBlockWidth;
				mapBlock.y = y*Config.mapBlockHeight;
				this.mapBlockDic.add(mapBlock.Index, mapBlock);
			}
		}
	}
	/**清除地图格子 */
	private clearMapBlock():void{
		this.mapBlockDic.clear();
		this.viewMapBg.removeChildren();
	}
}
 class MapBlock extends egret.Sprite {
	//标注格子坐标
	public X:number; //行
	public Y:number; //列
	public Index:number;//二维坐标转一维后的下标;
	private bitmap:egret.Bitmap;
	private path:string;
	public constructor(mx: number, my: number,index:number,mapId:number) {
		super();
		this.X = mx;
		this.Y = my;
		this.Index = index;
		this.path = "resource/assets/map/" + mapId + "/" + this.Y + "_" + this.X + ".jpg";
	}
	public loadMapBlock(isAdd:boolean = true):void
	{
		if (!!this.bitmap)
		{
			this.bitmap.visible = isAdd;
			return;
		}

		AssetsMgr.instance.loadSinglePicture(this.path,(bmp:egret.Bitmap)=>
		{
			this.bitmap = bmp;
			this.addChild(this.bitmap);

			this.bitmap.visible = isAdd;

		},this)		
	}
	
	public destory():void{
		this.bitmap = null;
	}
}