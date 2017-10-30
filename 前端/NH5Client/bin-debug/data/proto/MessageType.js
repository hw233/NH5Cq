var proto;
(function (proto) {
    var MessageType;
    (function (MessageType) {
        MessageType[MessageType["s_SendMessbox"] = 100] = "s_SendMessbox";
        MessageType[MessageType["MyAction"] = 101] = "MyAction";
        MessageType[MessageType["AddUnit"] = 102] = "AddUnit";
        MessageType[MessageType["MoveAction"] = 103] = "MoveAction";
        MessageType[MessageType["UseSkill"] = 104] = "UseSkill";
        MessageType[MessageType["Client_MonsterInfo"] = 105] = "Client_MonsterInfo";
        MessageType[MessageType["Client_DropInfo"] = 106] = "Client_DropInfo";
        MessageType[MessageType["s_Map_Player"] = 107] = "s_Map_Player";
        MessageType[MessageType["PlayerAttrs"] = 108] = "PlayerAttrs";
        MessageType[MessageType["Client_RoleInfo"] = 109] = "Client_RoleInfo";
        MessageType[MessageType["StrengthenInfo"] = 110] = "StrengthenInfo";
        MessageType[MessageType["RoleAttrs"] = 111] = "RoleAttrs";
        MessageType[MessageType["ItemData"] = 112] = "ItemData";
        MessageType[MessageType["S_Skill"] = 113] = "S_Skill";
        MessageType[MessageType["c_skill_up"] = 114] = "c_skill_up";
        MessageType[MessageType["s_skill_up"] = 115] = "s_skill_up";
        MessageType[MessageType["c_skillAllUp"] = 116] = "c_skillAllUp";
        MessageType[MessageType["s_skillAllUp"] = 117] = "s_skillAllUp";
        MessageType[MessageType["c_Login"] = 118] = "c_Login";
        MessageType[MessageType["s_Login"] = 119] = "s_Login";
        MessageType[MessageType["c_CreateChar"] = 120] = "c_CreateChar";
        MessageType[MessageType["c_wings_up"] = 121] = "c_wings_up";
        MessageType[MessageType["s_wings_up"] = 122] = "s_wings_up";
        MessageType[MessageType["c_wings_levup"] = 123] = "c_wings_levup";
        MessageType[MessageType["s_wings_levup"] = 124] = "s_wings_levup";
        MessageType[MessageType["c_ChangeEquip"] = 125] = "c_ChangeEquip";
        MessageType[MessageType["s_ChangeEquip"] = 126] = "s_ChangeEquip";
        MessageType[MessageType["AttrValue"] = 127] = "AttrValue";
        MessageType[MessageType["c_Reborn"] = 128] = "c_Reborn";
        MessageType[MessageType["s_Reborn"] = 129] = "s_Reborn";
        MessageType[MessageType["c_GetXiuWei"] = 130] = "c_GetXiuWei";
        MessageType[MessageType["s_GetXiuWei"] = 131] = "s_GetXiuWei";
        MessageType[MessageType["c_AddBag"] = 132] = "c_AddBag";
        MessageType[MessageType["s_AddBag"] = 133] = "s_AddBag";
        MessageType[MessageType["c_SmeltEquips"] = 134] = "c_SmeltEquips";
        MessageType[MessageType["s_SmeltEquips"] = 135] = "s_SmeltEquips";
        MessageType[MessageType["c_Strengthen"] = 136] = "c_Strengthen";
        MessageType[MessageType["s_Strengthen"] = 137] = "s_Strengthen";
        MessageType[MessageType["s_AddItems"] = 138] = "s_AddItems";
        MessageType[MessageType["s_ChangeItemNum"] = 139] = "s_ChangeItemNum";
        MessageType[MessageType["c_JingMai_Up"] = 140] = "c_JingMai_Up";
        MessageType[MessageType["s_JingMai_Up"] = 141] = "s_JingMai_Up";
        MessageType[MessageType["c_say"] = 142] = "c_say";
        MessageType[MessageType["s_say"] = 143] = "s_say";
        MessageType[MessageType["RoleBasicInfo"] = 144] = "RoleBasicInfo";
        MessageType[MessageType["c_SpecialEquip_Up"] = 145] = "c_SpecialEquip_Up";
        MessageType[MessageType["s_SpecialEquip_Up"] = 146] = "s_SpecialEquip_Up";
        MessageType[MessageType["c_createRole"] = 147] = "c_createRole";
        MessageType[MessageType["c_RequestShop"] = 148] = "c_RequestShop";
        MessageType[MessageType["s_RequestShop"] = 149] = "s_RequestShop";
        MessageType[MessageType["c_BuyItem"] = 150] = "c_BuyItem";
        MessageType[MessageType["s_BuyItem"] = 151] = "s_BuyItem";
        MessageType[MessageType["c_AddFriendByName"] = 152] = "c_AddFriendByName";
        MessageType[MessageType["s_FriendAck"] = 153] = "s_FriendAck";
        MessageType[MessageType["s_SendFriendList"] = 154] = "s_SendFriendList";
        MessageType[MessageType["c_ReplyAdd"] = 155] = "c_ReplyAdd";
        MessageType[MessageType["s_ReplyAdd"] = 156] = "s_ReplyAdd";
        MessageType[MessageType["FriendInfo"] = 157] = "FriendInfo";
        MessageType[MessageType["c_CreateNewSence"] = 158] = "c_CreateNewSence";
        MessageType[MessageType["s_CreateNewSence"] = 159] = "s_CreateNewSence";
        MessageType[MessageType["s_ChangeMainRole"] = 160] = "s_ChangeMainRole";
        MessageType[MessageType["s_Kickout"] = 161] = "s_Kickout";
        MessageType[MessageType["s_CreateRole"] = 162] = "s_CreateRole";
        MessageType[MessageType["DamageInfo"] = 163] = "DamageInfo";
        MessageType[MessageType["BuffEffect"] = 164] = "BuffEffect";
        MessageType[MessageType["s_RoleAttrChange"] = 165] = "s_RoleAttrChange";
        MessageType[MessageType["s_ItemAttrChange"] = 166] = "s_ItemAttrChange";
        MessageType[MessageType["s_BagItem"] = 167] = "s_BagItem";
        MessageType[MessageType["c_ItemUse"] = 168] = "c_ItemUse";
        MessageType[MessageType["s_ItemUse"] = 169] = "s_ItemUse";
        MessageType[MessageType["s_ChatCacheInfo"] = 170] = "s_ChatCacheInfo";
        MessageType[MessageType["s_ChatInfo"] = 171] = "s_ChatInfo";
        MessageType[MessageType["c_JingMai_LvUp"] = 172] = "c_JingMai_LvUp";
        MessageType[MessageType["s_JingMai_LvUp"] = 173] = "s_JingMai_LvUp";
        MessageType[MessageType["c_ManualRefresh"] = 174] = "c_ManualRefresh";
        MessageType[MessageType["s_UpdateFriendState"] = 175] = "s_UpdateFriendState";
        MessageType[MessageType["c_AddFriendById"] = 176] = "c_AddFriendById";
        MessageType[MessageType["c_DelFriend"] = 177] = "c_DelFriend";
        MessageType[MessageType["c_AddBlacklist"] = 178] = "c_AddBlacklist";
        MessageType[MessageType["RankInfo"] = 179] = "RankInfo";
        MessageType[MessageType["s_GetRankInfo"] = 180] = "s_GetRankInfo";
        MessageType[MessageType["s_RankChange"] = 181] = "s_RankChange";
        MessageType[MessageType["c_GetRankInfo"] = 182] = "c_GetRankInfo";
        MessageType[MessageType["s_GetRankList"] = 183] = "s_GetRankList";
        MessageType[MessageType["s_MailList"] = 184] = "s_MailList";
        MessageType[MessageType["MailData"] = 185] = "MailData";
        MessageType[MessageType["c_TakeAward"] = 186] = "c_TakeAward";
        MessageType[MessageType["s_TakeAward"] = 187] = "s_TakeAward";
        MessageType[MessageType["c_ReduceLevel"] = 188] = "c_ReduceLevel";
        MessageType[MessageType["s_ReduceLevel"] = 189] = "s_ReduceLevel";
        MessageType[MessageType["c_AssemblyEquip"] = 190] = "c_AssemblyEquip";
        MessageType[MessageType["s_AssemblyEquip"] = 191] = "s_AssemblyEquip";
        MessageType[MessageType["c_DisassembleEquip"] = 192] = "c_DisassembleEquip";
        MessageType[MessageType["s_DisassembleEquip"] = 193] = "s_DisassembleEquip";
        MessageType[MessageType["c_TakeAllAward"] = 194] = "c_TakeAllAward";
        MessageType[MessageType["s_TakeAllAward"] = 195] = "s_TakeAllAward";
        MessageType[MessageType["c_OpenMail"] = 196] = "c_OpenMail";
        MessageType[MessageType["s_OpenMail"] = 197] = "s_OpenMail";
        MessageType[MessageType["TaskData"] = 198] = "TaskData";
        MessageType[MessageType["s_TaskList"] = 199] = "s_TaskList";
        MessageType[MessageType["s_TaskChange"] = 200] = "s_TaskChange";
        MessageType[MessageType["c_FinishTask"] = 201] = "c_FinishTask";
        MessageType[MessageType["s_FinishTask"] = 202] = "s_FinishTask";
        MessageType[MessageType["c_ShenGongUpgrade"] = 203] = "c_ShenGongUpgrade";
        MessageType[MessageType["s_ShenGongUpgrade"] = 204] = "s_ShenGongUpgrade";
        MessageType[MessageType["c_JueweiUpgrade"] = 205] = "c_JueweiUpgrade";
        MessageType[MessageType["s_JueweiUpgrade"] = 206] = "s_JueweiUpgrade";
        MessageType[MessageType["c_ActiveFashion"] = 207] = "c_ActiveFashion";
        MessageType[MessageType["s_ActiveFashion"] = 208] = "s_ActiveFashion";
        MessageType[MessageType["c_DressFashion"] = 209] = "c_DressFashion";
        MessageType[MessageType["s_DressFashion"] = 210] = "s_DressFashion";
        MessageType[MessageType["c_FashionExpire"] = 211] = "c_FashionExpire";
        MessageType[MessageType["s_FashionExpire"] = 212] = "s_FashionExpire";
        MessageType[MessageType["c_LearnCheats"] = 213] = "c_LearnCheats";
        MessageType[MessageType["s_LearnCheats"] = 214] = "s_LearnCheats";
        MessageType[MessageType["c_Worship"] = 215] = "c_Worship";
        MessageType[MessageType["s_Worship"] = 216] = "s_Worship";
        MessageType[MessageType["s_RankWorship"] = 217] = "s_RankWorship";
        MessageType[MessageType["CheatsInfo"] = 218] = "CheatsInfo";
        MessageType[MessageType["s_CheatsList"] = 219] = "s_CheatsList";
        MessageType[MessageType["s_FriendList"] = 220] = "s_FriendList";
        MessageType[MessageType["c_ChangeHeadIcon"] = 221] = "c_ChangeHeadIcon";
        MessageType[MessageType["s_ChangeHeadIcon"] = 222] = "s_ChangeHeadIcon";
        MessageType[MessageType["c_RefreshMailExpire"] = 223] = "c_RefreshMailExpire";
        MessageType[MessageType["s_RefreshMailExpire"] = 224] = "s_RefreshMailExpire";
        MessageType[MessageType["c_TalismanStrengthen"] = 225] = "c_TalismanStrengthen";
        MessageType[MessageType["s_TalismanStrengthen"] = 226] = "s_TalismanStrengthen";
        MessageType[MessageType["c_PersonalBoss"] = 227] = "c_PersonalBoss";
        MessageType[MessageType["s_PersonalBoss"] = 228] = "s_PersonalBoss";
        MessageType[MessageType["s_SyncBossPlayer"] = 229] = "s_SyncBossPlayer";
        MessageType[MessageType["s_NotifyAction"] = 230] = "s_NotifyAction";
        MessageType[MessageType["RoleEntityInfo"] = 231] = "RoleEntityInfo";
        MessageType[MessageType["c_LeaveBossRoom"] = 232] = "c_LeaveBossRoom";
        MessageType[MessageType["s_LeaveBossRoom"] = 233] = "s_LeaveBossRoom";
        MessageType[MessageType["BossInfo"] = 234] = "BossInfo";
        MessageType[MessageType["c_WorldBoss"] = 235] = "c_WorldBoss";
        MessageType[MessageType["s_WorldBoss"] = 236] = "s_WorldBoss";
        MessageType[MessageType["s_BossAck"] = 237] = "s_BossAck";
        MessageType[MessageType["s_PersonalBossList"] = 238] = "s_PersonalBossList";
        MessageType[MessageType["c_WorldBossList"] = 239] = "c_WorldBossList";
        MessageType[MessageType["s_WorldBossList"] = 240] = "s_WorldBossList";
        MessageType[MessageType["c_SyncTime"] = 241] = "c_SyncTime";
        MessageType[MessageType["s_SyncTime"] = 242] = "s_SyncTime";
        MessageType[MessageType["c_RebornBoss"] = 243] = "c_RebornBoss";
        MessageType[MessageType["s_RebornBoss"] = 244] = "s_RebornBoss";
        MessageType[MessageType["c_MeetBattle"] = 245] = "c_MeetBattle";
        MessageType[MessageType["s_MeetBattle"] = 246] = "s_MeetBattle";
        MessageType[MessageType["s_MeetData"] = 247] = "s_MeetData";
        MessageType[MessageType["c_MeetKill"] = 248] = "c_MeetKill";
        MessageType[MessageType["s_MeetKill"] = 249] = "s_MeetKill";
        MessageType[MessageType["s_GuildInfo"] = 250] = "s_GuildInfo";
        MessageType[MessageType["GuildMemberData"] = 251] = "GuildMemberData";
        MessageType[MessageType["c_CreateGuild"] = 252] = "c_CreateGuild";
        MessageType[MessageType["s_CreateGuild"] = 253] = "s_CreateGuild";
        MessageType[MessageType["c_GuildList"] = 254] = "c_GuildList";
        MessageType[MessageType["s_GuildList"] = 255] = "s_GuildList";
        MessageType[MessageType["GuildBasicInfo"] = 256] = "GuildBasicInfo";
        MessageType[MessageType["c_EnterGuild"] = 257] = "c_EnterGuild";
        MessageType[MessageType["s_EnterGuild"] = 258] = "s_EnterGuild";
        MessageType[MessageType["c_LeaveGuild"] = 259] = "c_LeaveGuild";
        MessageType[MessageType["s_LeaveGuild"] = 260] = "s_LeaveGuild";
        MessageType[MessageType["c_GuildApprove"] = 261] = "c_GuildApprove";
        MessageType[MessageType["s_GuildApprove"] = 262] = "s_GuildApprove";
        MessageType[MessageType["s_GuildNotify"] = 263] = "s_GuildNotify";
        MessageType[MessageType["c_AdjustGuildDuty"] = 264] = "c_AdjustGuildDuty";
        MessageType[MessageType["s_AdjustGuildDuty"] = 265] = "s_AdjustGuildDuty";
        MessageType[MessageType["c_ChangeTitle"] = 266] = "c_ChangeTitle";
        MessageType[MessageType["s_ChangeTitle"] = 267] = "s_ChangeTitle";
        MessageType[MessageType["c_GuildUpgrade"] = 268] = "c_GuildUpgrade";
        MessageType[MessageType["s_GuildUpgrade"] = 269] = "s_GuildUpgrade";
        MessageType[MessageType["c_GuildSkillStrengthen"] = 270] = "c_GuildSkillStrengthen";
        MessageType[MessageType["s_GuildSkillStrengthen"] = 271] = "s_GuildSkillStrengthen";
        MessageType[MessageType["c_GuildDonate"] = 272] = "c_GuildDonate";
        MessageType[MessageType["s_GuildDonate"] = 273] = "s_GuildDonate";
        MessageType[MessageType["s_GetIntervalChargeData"] = 274] = "s_GetIntervalChargeData";
        MessageType[MessageType["s_GetContinuChargeData"] = 275] = "s_GetContinuChargeData";
        MessageType[MessageType["c_ReceiveRewards"] = 276] = "c_ReceiveRewards";
        MessageType[MessageType["s_ReceiveRewards"] = 277] = "s_ReceiveRewards";
        MessageType[MessageType["c_GuildBattleReq"] = 278] = "c_GuildBattleReq";
        MessageType[MessageType["s_GuildBattleReq"] = 279] = "s_GuildBattleReq";
        MessageType[MessageType["c_GuildChangeScene"] = 280] = "c_GuildChangeScene";
        MessageType[MessageType["s_GuildChangeScene"] = 281] = "s_GuildChangeScene";
        MessageType[MessageType["c_GuildAtkTarget"] = 282] = "c_GuildAtkTarget";
        MessageType[MessageType["C_Charge"] = 283] = "C_Charge";
        MessageType[MessageType["S_Charge"] = 284] = "S_Charge";
        MessageType[MessageType["S_ChargeInfo"] = 285] = "S_ChargeInfo";
        MessageType[MessageType["C_MonthCardExpire"] = 286] = "C_MonthCardExpire";
        MessageType[MessageType["S_MonthCardExpire"] = 287] = "S_MonthCardExpire";
        MessageType[MessageType["s_SyncSceneRole"] = 288] = "s_SyncSceneRole";
        MessageType[MessageType["ChargeData"] = 289] = "ChargeData";
        MessageType[MessageType["s_mess"] = 300] = "s_mess";
        MessageType[MessageType["c_move"] = 350] = "c_move";
        MessageType[MessageType["s_move"] = 351] = "s_move";
        MessageType[MessageType["Pos"] = 352] = "Pos";
        MessageType[MessageType["s_Mapload"] = 353] = "s_Mapload";
        MessageType[MessageType["s_Mapshow"] = 354] = "s_Mapshow";
        MessageType[MessageType["s_setpos"] = 355] = "s_setpos";
        MessageType[MessageType["s_Map_UnitAdd"] = 356] = "s_Map_UnitAdd";
        MessageType[MessageType["s_Map_UnitRemove"] = 357] = "s_Map_UnitRemove";
        MessageType[MessageType["s_MapUnitInfo"] = 358] = "s_MapUnitInfo";
        MessageType[MessageType["s_MapUnit_Model"] = 359] = "s_MapUnit_Model";
        MessageType[MessageType["s_MapUnit_title"] = 360] = "s_MapUnit_title";
        MessageType[MessageType["c_MapUnit_sel"] = 361] = "c_MapUnit_sel";
        MessageType[MessageType["s_MapUnit_state"] = 362] = "s_MapUnit_state";
        MessageType[MessageType["MapUnit_extraInfo"] = 363] = "MapUnit_extraInfo";
        MessageType[MessageType["s_TweenTo"] = 364] = "s_TweenTo";
        MessageType[MessageType["s_addFire"] = 365] = "s_addFire";
        MessageType[MessageType["s_removeFire"] = 366] = "s_removeFire";
        MessageType[MessageType["s_MapUnit_PkState"] = 367] = "s_MapUnit_PkState";
        MessageType[MessageType["c_GetDrop"] = 368] = "c_GetDrop";
        MessageType[MessageType["c_flyto"] = 369] = "c_flyto";
        MessageType[MessageType["c_revive"] = 370] = "c_revive";
        MessageType[MessageType["c_skill_use"] = 400] = "c_skill_use";
        MessageType[MessageType["s_skilluse"] = 401] = "s_skilluse";
        MessageType[MessageType["s_skill_add"] = 402] = "s_skill_add";
        MessageType[MessageType["SkillInfo"] = 403] = "SkillInfo";
        MessageType[MessageType["s_Damage"] = 404] = "s_Damage";
        MessageType[MessageType["s_skill_setAttr"] = 405] = "s_skill_setAttr";
        MessageType[MessageType["s_CD_add"] = 450] = "s_CD_add";
        MessageType[MessageType["s_CD_remove"] = 451] = "s_CD_remove";
        MessageType[MessageType["c_item_use"] = 500] = "c_item_use";
        MessageType[MessageType["c_item_move"] = 501] = "c_item_move";
        MessageType[MessageType["c_item_sell"] = 502] = "c_item_sell";
        MessageType[MessageType["c_item_stone"] = 503] = "c_item_stone";
        MessageType[MessageType["c_item_unstone"] = 504] = "c_item_unstone";
        MessageType[MessageType["c_item_destroy"] = 505] = "c_item_destroy";
        MessageType[MessageType["s_item_add"] = 506] = "s_item_add";
        MessageType[MessageType["s_item_remove"] = 507] = "s_item_remove";
        MessageType[MessageType["s_item_setplace"] = 508] = "s_item_setplace";
        MessageType[MessageType["s_ItemInfo"] = 509] = "s_ItemInfo";
        MessageType[MessageType["ItemExtraInfo"] = 510] = "ItemExtraInfo";
        MessageType[MessageType["c_item_improve"] = 511] = "c_item_improve";
        MessageType[MessageType["c_item_maxImprove"] = 512] = "c_item_maxImprove";
        MessageType[MessageType["s_item_setAttr"] = 513] = "s_item_setAttr";
        MessageType[MessageType["s_item_update"] = 514] = "s_item_update";
        MessageType[MessageType["c_unEquip"] = 515] = "c_unEquip";
        MessageType[MessageType["s_Prefix"] = 516] = "s_Prefix";
        MessageType[MessageType["c_item_sort"] = 517] = "c_item_sort";
        MessageType[MessageType["s_item_sort"] = 518] = "s_item_sort";
        MessageType[MessageType["c_item_upgrade"] = 519] = "c_item_upgrade";
        MessageType[MessageType["s_item_upgrade"] = 520] = "s_item_upgrade";
        MessageType[MessageType["c_item_moveImprove"] = 521] = "c_item_moveImprove";
        MessageType[MessageType["s_item_Confirm"] = 522] = "s_item_Confirm";
        MessageType[MessageType["c_item_split"] = 523] = "c_item_split";
        MessageType[MessageType["c_xilian"] = 524] = "c_xilian";
        MessageType[MessageType["s_xilian"] = 525] = "s_xilian";
        MessageType[MessageType["c_item_zhufu"] = 526] = "c_item_zhufu";
        MessageType[MessageType["s_item_zhufu"] = 527] = "s_item_zhufu";
        MessageType[MessageType["c_extendgrid"] = 528] = "c_extendgrid";
        MessageType[MessageType["c_group_apply"] = 600] = "c_group_apply";
        MessageType[MessageType["c_group_leave"] = 601] = "c_group_leave";
        MessageType[MessageType["s_GroupInfo"] = 602] = "s_GroupInfo";
        MessageType[MessageType["s_Group_addMember"] = 603] = "s_Group_addMember";
        MessageType[MessageType["s_Group_removeMember"] = 604] = "s_Group_removeMember";
        MessageType[MessageType["s_Group_Disband"] = 605] = "s_Group_Disband";
        MessageType[MessageType["s_GroupUpdateLeader"] = 606] = "s_GroupUpdateLeader";
        MessageType[MessageType["s_groupInvite"] = 607] = "s_groupInvite";
        MessageType[MessageType["c_group_accept"] = 608] = "c_group_accept";
        MessageType[MessageType["c_group_refuse"] = 609] = "c_group_refuse";
        MessageType[MessageType["s_group_leave"] = 610] = "s_group_leave";
        MessageType[MessageType["c_group_appoint"] = 611] = "c_group_appoint";
        MessageType[MessageType["c_group_kick"] = 612] = "c_group_kick";
        MessageType[MessageType["s_Task_triger"] = 650] = "s_Task_triger";
        MessageType[MessageType["s_TaskInfo"] = 651] = "s_TaskInfo";
        MessageType[MessageType["s_TaskActive"] = 652] = "s_TaskActive";
        MessageType[MessageType["s_TaskInActive"] = 653] = "s_TaskInActive";
        MessageType[MessageType["s_TaskRemove"] = 654] = "s_TaskRemove";
        MessageType[MessageType["c_Task_accept"] = 655] = "c_Task_accept";
        MessageType[MessageType["c_Task_giveup"] = 656] = "c_Task_giveup";
        MessageType[MessageType["c_Task_getBonus"] = 657] = "c_Task_getBonus";
        MessageType[MessageType["s_Task_dayInfo"] = 658] = "s_Task_dayInfo";
        MessageType[MessageType["c_Task_DayUp"] = 659] = "c_Task_DayUp";
        MessageType[MessageType["s_CharInfo"] = 700] = "s_CharInfo";
        MessageType[MessageType["s_Player_EndInit"] = 701] = "s_Player_EndInit";
        MessageType[MessageType["s_CharInfoList"] = 702] = "s_CharInfoList";
        MessageType[MessageType["c_enterGame"] = 703] = "c_enterGame";
        MessageType[MessageType["s_UIshow"] = 750] = "s_UIshow";
        MessageType[MessageType["s_UIhide"] = 751] = "s_UIhide";
        MessageType[MessageType["c_UIClick"] = 752] = "c_UIClick";
        MessageType[MessageType["s_TimerAdd"] = 753] = "s_TimerAdd";
        MessageType[MessageType["s_TimerRemove"] = 754] = "s_TimerRemove";
        MessageType[MessageType["c_addPoint"] = 800] = "c_addPoint";
        MessageType[MessageType["s_Buff_add"] = 850] = "s_Buff_add";
        MessageType[MessageType["s_Buff_remove"] = 851] = "s_Buff_remove";
        MessageType[MessageType["s_Buff_clear"] = 852] = "s_Buff_clear";
        MessageType[MessageType["c_mix"] = 900] = "c_mix";
        MessageType[MessageType["s_mix"] = 901] = "s_mix";
        MessageType[MessageType["c_market_up"] = 950] = "c_market_up";
        MessageType[MessageType["c_market_down"] = 951] = "c_market_down";
        MessageType[MessageType["c_market_buy"] = 952] = "c_market_buy";
        MessageType[MessageType["s_market_up"] = 953] = "s_market_up";
        MessageType[MessageType["s_market_down"] = 954] = "s_market_down";
        MessageType[MessageType["s_market_buy"] = 955] = "s_market_buy";
        MessageType[MessageType["c_market_search"] = 956] = "c_market_search";
        MessageType[MessageType["s_market_list"] = 957] = "s_market_list";
        MessageType[MessageType["c_market_getmoney"] = 958] = "c_market_getmoney";
        MessageType[MessageType["c_market_my"] = 959] = "c_market_my";
        MessageType[MessageType["s_market_item"] = 960] = "s_market_item";
        MessageType[MessageType["c_shop_buy"] = 1000] = "c_shop_buy";
        MessageType[MessageType["c_shop_buyAndUse"] = 1001] = "c_shop_buyAndUse";
        MessageType[MessageType["c_Vip_buy"] = 1002] = "c_Vip_buy";
        MessageType[MessageType["s_Vip_leftime"] = 1003] = "s_Vip_leftime";
        MessageType[MessageType["s_Vip_price"] = 1004] = "s_Vip_price";
        MessageType[MessageType["s_broadcast"] = 1050] = "s_broadcast";
        MessageType[MessageType["c_npc"] = 1100] = "c_npc";
        MessageType[MessageType["c_npc_transport"] = 1101] = "c_npc_transport";
        MessageType[MessageType["s_executeScript"] = 1150] = "s_executeScript";
        MessageType[MessageType["c_mapenter"] = 1151] = "c_mapenter";
        MessageType[MessageType["c_mapexit"] = 1152] = "c_mapexit";
        MessageType[MessageType["s_mapTimer"] = 1153] = "s_mapTimer";
        MessageType[MessageType["s_map_turn"] = 1154] = "s_map_turn";
        MessageType[MessageType["s_map_entertimes"] = 1155] = "s_map_entertimes";
        MessageType[MessageType["s_map_pop"] = 1156] = "s_map_pop";
        MessageType[MessageType["c_map_ClickBtn"] = 1157] = "c_map_ClickBtn";
        MessageType[MessageType["s_map_lasttime"] = 1158] = "s_map_lasttime";
        MessageType[MessageType["s_map_lastmonster"] = 1159] = "s_map_lastmonster";
        MessageType[MessageType["s_map_lastturn"] = 1160] = "s_map_lastturn";
        MessageType[MessageType["c_map_addcount"] = 1161] = "c_map_addcount";
        MessageType[MessageType["c_reborn"] = 1200] = "c_reborn";
        MessageType[MessageType["s_reborn"] = 1201] = "s_reborn";
        MessageType[MessageType["s_EXPRate_add"] = 1250] = "s_EXPRate_add";
        MessageType[MessageType["c_heart"] = 1251] = "c_heart";
        MessageType[MessageType["c_setPKFlag"] = 1252] = "c_setPKFlag";
        MessageType[MessageType["s_heart"] = 1253] = "s_heart";
        MessageType[MessageType["s_boss_state"] = 1300] = "s_boss_state";
        MessageType[MessageType["c_boss_goto"] = 1301] = "c_boss_goto";
        MessageType[MessageType["s_bonus_state"] = 1350] = "s_bonus_state";
        MessageType[MessageType["c_bonus_get"] = 1351] = "c_bonus_get";
        MessageType[MessageType["c_bonus_getLixian"] = 1352] = "c_bonus_getLixian";
        MessageType[MessageType["s_bonus_lixian"] = 1353] = "s_bonus_lixian";
        MessageType[MessageType["s_LiveNess"] = 1354] = "s_LiveNess";
        MessageType[MessageType["c_team_create"] = 1400] = "c_team_create";
        MessageType[MessageType["s_team_info"] = 1401] = "s_team_info";
        MessageType[MessageType["MemberItem"] = 1402] = "MemberItem";
        MessageType[MessageType["c_team_add"] = 1403] = "c_team_add";
        MessageType[MessageType["c_team_remove"] = 1404] = "c_team_remove";
        MessageType[MessageType["c_team_list"] = 1405] = "c_team_list";
        MessageType[MessageType["s_team_list"] = 1406] = "s_team_list";
        MessageType[MessageType["TeamItem"] = 1407] = "TeamItem";
        MessageType[MessageType["c_team_apply"] = 1408] = "c_team_apply";
        MessageType[MessageType["c_team_appoint"] = 1409] = "c_team_appoint";
        MessageType[MessageType["c_team_disband"] = 1410] = "c_team_disband";
        MessageType[MessageType["s_team_disband"] = 1411] = "s_team_disband";
        MessageType[MessageType["s_team_leave"] = 1412] = "s_team_leave";
        MessageType[MessageType["s_team_invite"] = 1413] = "s_team_invite";
        MessageType[MessageType["c_team_confirm"] = 1414] = "c_team_confirm";
        MessageType[MessageType["c_team_quick"] = 1415] = "c_team_quick";
        MessageType[MessageType["c_look_fujin"] = 1450] = "c_look_fujin";
        MessageType[MessageType["s_look_infos"] = 1451] = "s_look_infos";
        MessageType[MessageType["PlayerDesc"] = 1452] = "PlayerDesc";
        MessageType[MessageType["c_IO_Connect"] = 1500] = "c_IO_Connect";
        MessageType[MessageType["c_IO_close"] = 1501] = "c_IO_close";
        MessageType[MessageType["s_RandShop_updateMoney"] = 1550] = "s_RandShop_updateMoney";
        MessageType[MessageType["s_RandShop"] = 1551] = "s_RandShop";
        MessageType[MessageType["s_RandShopList"] = 1552] = "s_RandShopList";
        MessageType[MessageType["c_RandShop_update"] = 1553] = "c_RandShop_update";
        MessageType[MessageType["c_RandShop_buy"] = 1554] = "c_RandShop_buy";
        MessageType[MessageType["c_GetTurnList"] = 1600] = "c_GetTurnList";
        MessageType[MessageType["s_TurnList"] = 1601] = "s_TurnList";
        MessageType[MessageType["c_turn_start"] = 1602] = "c_turn_start";
        MessageType[MessageType["s_turn_result"] = 1603] = "s_turn_result";
        MessageType[MessageType["c_turn_over"] = 1604] = "c_turn_over";
        MessageType[MessageType["s_turn_over"] = 1605] = "s_turn_over";
        MessageType[MessageType["TurnItem"] = 1606] = "TurnItem";
        MessageType[MessageType["s_turn_notice"] = 1607] = "s_turn_notice";
        MessageType[MessageType["s_SBK_aff"] = 1650] = "s_SBK_aff";
        MessageType[MessageType["c_SBK_btnindex"] = 1651] = "c_SBK_btnindex";
        MessageType[MessageType["s_SBK_btnstatus"] = 1652] = "s_SBK_btnstatus";
        MessageType[MessageType["c_GetRank"] = 1700] = "c_GetRank";
        MessageType[MessageType["s_ph_Rank"] = 1701] = "s_ph_Rank";
        MessageType[MessageType["req_Login"] = 1750] = "req_Login";
        MessageType[MessageType["res_Login"] = 1751] = "res_Login";
        MessageType[MessageType["req_BroadCast"] = 1752] = "req_BroadCast";
        MessageType[MessageType["req_SendMail"] = 1753] = "req_SendMail";
        MessageType[MessageType["res_SendMail"] = 1754] = "res_SendMail";
        MessageType[MessageType["req_RecordList"] = 1755] = "req_RecordList";
        MessageType[MessageType["res_RecordList"] = 1756] = "res_RecordList";
        MessageType[MessageType["s_huodong_status"] = 1800] = "s_huodong_status";
        MessageType[MessageType["c_huodong_add"] = 1801] = "c_huodong_add";
        MessageType[MessageType["c_huodong_start"] = 1802] = "c_huodong_start";
    })(MessageType = proto.MessageType || (proto.MessageType = {}));
})(proto || (proto = {}));
//# sourceMappingURL=MessageType.js.map