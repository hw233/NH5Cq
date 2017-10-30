var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//眩晕
var FaintBuff = (function (_super) {
    __extends(FaintBuff, _super);
    function FaintBuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FaintBuff.prototype, "type", {
        //Buff类型
        get: function () { return BuffType.Faint; },
        enumerable: true,
        configurable: true
    });
    //Buff被添加时调用
    FaintBuff.prototype.addBuff = function (target) {
        var targetComp = this.target.getComponent(ComponentType.Blackboard);
        targetComp.setAttrValue(data.RoleAttr.state, RoleState.Faint);
        this.target.trigger(RoleEventDefine.ChangeState, FSMState.Faint, this.target.currDirection);
        this.effectTime = this.buffTp.EffectUpLimit;
        if (this.buffTp.EffectUpLimit > 0) {
            this.timerInfo = new TimerInfo(this);
            TimerMgr.Instance.addTimerEvent(this.timerInfo);
        }
        return _super.prototype.addBuff.call(this, target);
    };
    //Buff被移除时调用
    FaintBuff.prototype.removeBuff = function () {
        var targetComp = this.target.getComponent(ComponentType.Blackboard);
        targetComp.setAttrValue(data.RoleAttr.state, RoleState.Normal);
        this.target.trigger(RoleEventDefine.ChangeState, FSMState.Idle, this.target.currDirection);
        return _super.prototype.removeBuff.call(this);
    };
    //定时器更新
    FaintBuff.prototype.TimerUpdate = function (timerInfo, deltaTime) {
        if (this.buffTp.EffectUpLimit <= 0)
            return;
        this.effectTime -= deltaTime;
        if (this.effectTime <= 0) {
            var battleComp = this.target.getComponent(ComponentType.Battle);
            battleComp.removeBuff(this);
        }
    };
    return FaintBuff;
}(BuffBase));
__reflect(FaintBuff.prototype, "FaintBuff");
//# sourceMappingURL=FaintBuff.js.map