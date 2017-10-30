//怪物战斗组件
class MonsterBattleComponent extends BattleComponent
{
	//怪物所有技能
	protected skillDic:Dictionary<number, SkillBase>;

	//怪物AI模版
	protected monsterAiTp:data.MonsterAITemple;

	//怪物模版
	protected monsterTp:data.UnitTemple;

	//移动时间
	public get moveTime():number { return this.monsterTp.moveTime; }

	//攻击距离
	public get atkDistance():number { return this.monsterTp.atkDistance; }

	//构造 [0]:角色技能信息 [1]:怪物模版ID
	public constructor(owner:Entity, arg:any[])
	{
		super(owner);

		this.isStartFight = true;

		var skillIdList = arg[0] as List<number>;
		var monsterId = arg[1] as number;

		this.monsterTp = TempleMgr.select<data.UnitTemple>("UnitTemple", monsterId);
		this.monsterAiTp = TempleMgr.select<data.MonsterAITemple>("MonsterAITemple", this.monsterTp.AI);

		this.skillDic = new Dictionary<number, SkillBase>();
		skillIdList.forEach(id =>
		{
			let skill = SkillBase.createSkillById(owner, id);
			if (!!skill)
				this.skillDic.add(skill.skillGroupId, skill);
		});
	}

	//初始化组件
	public init():void
	{
		super.init();

		this.owner.addEventListener(RoleEventDefine.TriggerFight, this.triggerFight);
	}

	//释放组件
	public release():void
	{
		super.release();

		this.owner.removeEventListener(RoleEventDefine.TriggerFight, this.triggerFight);
	}

	//获取可释放的技能
	public getCastSkill():SkillBase
	{
		var blackboardComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var hp = blackboardComp.getAttrValue(data.RoleAttr.HP);
		var mhp = blackboardComp.getAttrValue(data.RoleAttr.MHP);

		var hpRate = hp / mhp;

		//当出现多个血量比例时，应该升序填写，满足任何一个时跳出
		var skillId:number = 0;
		for(let i = 0; i < this.monsterAiTp.lifePrc.length; i++)
		{
			let liftRate = this.monsterAiTp.lifePrc[i] / 10000;
			if (hpRate <= liftRate)
			{
				skillId = this.monsterAiTp.lifePrc[i];
				break;
			}
		}

		if (skillId <= 0)
		{
			for(let j = 0; j < this.monsterAiTp.fightTime.length; j++)
			{
				let fightTime = this.monsterAiTp.fightTime[j] / 10000;
				if (SceneModule.BattleScene.currTime >= fightTime)
				{
					skillId = this.monsterAiTp.timeSkill[j];
					break;
				}
			}
		}

		if (skillId <= 0)
		{
			let random = Utility.random(0, 10000);
			for(let k = 0; k < this.monsterAiTp.rate.length; k++)
			{
				let rate = this.monsterAiTp.rate[k] / 10000;
				if (random <= rate)
				{
					skillId = this.monsterAiTp.rateSkill[k];
					break;
				}
			}
		}

		if (skillId <= 0)
			skillId = this.monsterAiTp.skill;

		var skill = this.skillDic.getValue(skillId);
		if (!skill)
			console.error("MonsterBattleComponent getCastSkill cast skillId == 0");

		return skill;
	}

	//触发战斗
	private triggerFight(args:any[]):void
	{
		this.isStartFight = true;

		this.owner.removeEventListener(RoleEventDefine.TriggerFight, this.triggerFight);
	}
}