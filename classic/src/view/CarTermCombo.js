
/**
 * 车载下拉框，根据指定分组ID动态加载所属车载记录
 */
Ext.define('Admin.view.CarTermCombo', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.carTermCombo',
	
	fieldLabel: '车载列表',
    queryMode: 'local',
    editable: false,
    displayField: 'certId',
    valueField: 'mobile',
    
    initComponent: function () {
    	this.store = Ext.create('Ext.data.Store', {
    		model:'Admin.model.monitor.MonitorCarTerm'
    	});
    	this.callParent(arguments);
    },
    
    /**
     * 加载所属分组下的车载记录
     * @param {String} 分组ID
     */
    loadCarTerm: function(groupId){    	    	
    	var records = Admin.app.getCarsByGroupId(groupId);
    	this.clearValue();
    	
    	if(records.length > 0){
			this.store.loadRecords(records);
		}else{
			this.store.removeAll();			
			//Ext.Msg.alert('警告','当前业户下未找到匹配的车辆！');
		}    	
    },
    //加载所属分组以及子分组的车载记录
    loadGroupCar: function(groupId){
    	
    	var records = Admin.app.loadGroupCar(groupId);
    	this.clearValue();
    	if(records.length > 0){
			this.store.loadRecords(records);
		}else{
			this.store.removeAll();			
		}   
    }
    
});