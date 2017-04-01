/**
 * 角色添加、修改、详情窗口
 */
Ext.define('Admin.view.systemadmin.RoleWindow', {
	extend : 'Ext.window.Window',
    alias : 'widget.systemadminRoleWindow', 
	width : 400,
	height: 560,
	// 自定义变量
	actionType : 0,		//操作类型。0:添加；1:修改；2:详情。
	curModel : null,	//当前绑定的record,即model实例
    autoShow: true,
    modal: true,

     layout: 'fit',
	initComponent: function() {
		var moduleStore = Ext.create("Ext.data.TreeStore", {
			autoLoad : false			
		});
		
	//	var sysInfoStore = Admin.app.getDictSubSysInfoStore();
	//	var sysInfoData = sysInfoStore.query('applyFlag' , '1').items;
		this.items = [{
			xtype : 'form',
			border : 0,
			frame: true,
		    items :[
		    {
				xtype : 'fieldcontainer',
				layout : 'form',
				defaultType: 'textfield',
				items : [
				{
					fieldLabel : '权限掩码',
					itemId: 'rightMask',
					name : 'rightMask',
					hidden : true
				}/*,
				{
					fieldLabel : '系统ID',
					name : 'sysId',
					hidden : true,
					value: Admin.app.getSysId()
				}*/,
				{
					fieldLabel : '角色ID',				
					name : 'roleId',
					labelWidth : 60,
					readOnly : true,
					emptyText: '角色ID由系统自动生成',
					anchor:'100%'
				},{
	   	        	xtype : 'combobox',
					fieldLabel : '所属系统',
					labelWidth : 60,
					itemId : 'sysId',
					name : 'sysId',
					store: Ext.create('Ext.data.Store' , {
						fields: ['sysId' , 'sysName']
					}),
					valueField: 'sysId',
		            displayField: 'sysName',
		            queryMode: 'local',
					editable : false
	   	        }, 
				{
					xtype : 'textfield',
					fieldLabel : '角色名称',
					name : 'roleName',
					labelWidth : 60,
					allowBlank : false,
					anchor:'100%'
				},
				{
					xtype : 'combobox',
					fieldLabel : '角色类型',
					labelWidth : 60,
					itemId : 'roleType',
					name : 'roleType',
					allowBlank : false,
		            queryMode: 'local',
	            	valueField: 'roleType',
	                displayField: 'roleTypeName',
	                value: '0',
					store :Ext.create('Ext.data.Store', {
					    fields:['roleType','roleTypeName'],
					    data:[						    
						    {roleType:'0',roleTypeName:'其他'},
						    {roleType:'1',roleTypeName:'巡检人'},
						    {roleType:'2',roleTypeName:'维护人'}
						]
					}) 
				},{
					xtype:'combo',
					name : 'applyFlag',
					itemId : 'applyFlag',
					fieldLabel : '是否可申请',
					labelWidth : 70,
					readOnly : this.actionType==1? true:false,
					allowBlank : false,
					queryMode: 'local',
					valueField: 'id',
	                displayField: 'text',
	                value: '1',
					store :Ext.create('Ext.data.Store', {
					    fields:['id','text'],
					    data:[						    
						    {id:'0',text:'不可以'},
						    {id:'1',text:'可以'}
						]
					}) 
				}]			
		    },
		    {
				xtype : 'treepanel',
				title : '模块权限',	
				frame : true,
				border : false,
				height : 380,
				checkModel : 'cascade',
				lines : true,
				useArrows : false,
				rootVisible : false,
				store : moduleStore,
				buttonAlign : 'center',
				buttons : [
				{
					text : '确 定',
					width : 80,
					itemId : 'addBtn',
					style: 'margin-right:20px',
					handler : function(){
						var me = this.ownerCt.ownerCt.ownerCt;					
						if(!me.getForm().isValid()){
							Ext.Msg.alert('错误','有不符合要求的数据');
							return null;
						}
						
						var rightArray = me.down('treepanel').getChecked();
						var checkStr = [];
						Ext.Array.each(rightArray, function(rec){
		                	checkStr.push(rec.raw.mid +"#"+ rec.raw.mlevel);//moduleId+#+menuLevel
		                });
		                if(checkStr.length <= 0){
		                	Ext.Msg.alert('错误', '没有勾选任何权限!');
		                	return false;
		                }
		                me.down('#rightMask').setValue(checkStr.join(','));
		                
						var store,
							newRole;
					
						// 添加
						if(me.ownerCt.actionType == 0){
							var newRole = Ext.create('Admin.model.systemadmin.Role', me.getValues());					
							var grids = Ext.ComponentQuery.query('systemadminRolePanel grid');
							store = grids[0].getStore();
							store.add(newRole);
						}else {//修改
							me.ownerCt.curModel.set(me.getValues());
							store = me.ownerCt.curModel.store;
						}
						store.getProxy().url='rest/systemadmin/role/manage_do';
						store.sync({
							success : function(batch, options){
								store.getProxy().url='rest/systemadmin/role';
								me.ownerCt.close();
								// 更新角色字典
								Admin.app.getDictRolesStore().reload();
							},
							failure : function(batch, options){
								store.getProxy().url='rest/systemadmin/role';
								// 失败回滚
								store.rejectChanges();
							}
						});
						// 失败情况提示统一由全局AJAX事件requestcomplete处理，见app.js。
				   		}
				}, {	
				text : '关 闭',
				width : 80,
				itemId : 'cancelBtn',
				handler : function(){
					this.ownerCt.ownerCt.ownerCt.ownerCt.close();
					}
				}],
				listeners : {
					checkchange : function(node, checked, eOpts) {
						
						var mid = node.raw.mid + "";
						var mId = new Array();
						if(mid.indexOf("_") > 0){
							mId = mid.split("_");
						}else{
							mId.push(mid);
							mId.push(0);
						}
						
						var disables = node.raw.disableString + "";
						var arrays = new Array();
						if(disables.indexOf(",") > 0){
							arrays = disables.split(",");
						}else{
							arrays.push(disables);
						}
						
						if (checked == true){
							if(Admin.app.checkRight(mId[0], mId[1])){
								// 如果此节点是2级节点，则需要勾选其父节点
								if (node.data.depth == 2){	
									node.parentNode.set("checked",checked);
								}
								// 如果此节点是3级节点，则需要勾选其父节点和爷爷节点
								else if (node.data.depth == 3){
									node.parentNode.set("checked",checked);
									node.parentNode.parentNode.set("checked",checked);
								}
							}else{
								//勾选时检测当前用户角色有没有权限
								for(var i=0; i<arrays.length; i++){
									if(node.raw.text == arrays[i]){
										node.set("checked",false);
										alert("没有设置权限");
										return;
									}
								}
							}
						}
						else{
							if(Admin.app.checkRight(mId[0], mId[1])){
								// 如果不是叶子节点，则去掉所有子结点的勾
								if (!node.isLeaf()){
									node.cascadeBy(function (child) {  
				                        child.set("checked", checked);  
				                    });
								}
							}else{
								//勾选时检测当前用户角色有没有权限
								for(var i=0; i<arrays.length; i++){
									if(node.raw.text == arrays[i]){
										node.set("checked",false);
										alert("没有设置权限");
										return;
									}
								}
							}
						}				
					}
				}
			}]}];			
		    
		this.callParent(arguments);
	},
	
    /**
     * 加载系统模块结构树
     * @param {int} roleId 修改角色时重新加载权限树，传递角色ID参数
     */
	loadRightTree : function (roleId,sysId){
		this.down('treepanel').getStore().setProxy({
			type : 'ajax',
			url : 'rest/systemadmin/role/loadmoudle',
			reader: 'json'
		});
		
		if(roleId){
			if(roleId==-1){
				this.down('treepanel').getStore().load({
					params:{sysId:sysId}
				});	
			}else{
				this.down('treepanel').getStore().load({
					params:{roleId:roleId,
						sysId:sysId}
					
				});	
			}
		}
		else{
			this.down('treepanel').store.load({
				params:{sysId:7}
			});
		}
	}
	
});