module data{	export interface ZhuLingTemple{		/**		* 编号		*/		ID:number;		/**		* 装备部位		*/		pos:number;		/**		* 下一等级ID		*/		nextID:number;		/**		* 注灵等级		*/		lev:number;		/**		* 所需材料		*/		itemID:number;		/**		* 所需材料数量		*/		itemNum:number;		/**		* 增加属性位置		*/		AttrEnum:number[];		/**		* 增加属性值		*/		Attr:number[];		/**		* 提升战力		*/		FightValue:number;	}}