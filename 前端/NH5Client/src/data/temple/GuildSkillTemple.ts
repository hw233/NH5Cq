module data{	export interface GuildSkillTemple{		/**		* 编号		*/		ID:number;		/**		* 技能类		*/		skillType:number;		/**		* 技能名称		*/		Name:string;		/**		* 下一等级ID		*/		Nextid:number;		/**		* 技能等级		*/		Level:number;		/**		* 需要金币数量		*/		needMoney:number;		/**		* 需要帮会贡献		*/		NeedConr:number;		/**		* 增加属性位置		*/		AttrEnum:number[];		/**		* 增加属性值		*/		Attr:number[];		/**		* 提升战力		*/		FightValue:number;	}}