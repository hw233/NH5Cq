//眩晕状态
class FaintState extends StateBase
{
	//状态
	public get state():FSMState { return FSMState.Faint; }

	//进入状态
	public OnEnter(args:any[]):void{}

	//执行状态
	//public OnExcuter(deltaTime:number):void {}

	//离开状态
	public OnLeave():void {}
}