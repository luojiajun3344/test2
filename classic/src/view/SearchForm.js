/**
 * 查询Form基类.
 * 支持多级fieldContainer来辅助表单field组件布局
 * 默认为横向布局，推荐fieldContainer组件采用列布局
 * 此form表单中不允许出现name属性为start,page,limit,count,group,sort,filter通用参数名的field组件。
 * @author LJY
 * @since 2013.9.3
 */
Ext.define('Admin.view.SearchForm', {
    extend: 'Ext.form.Panel',
    alias : 'widget.searchForm',
 	layout: { 
        type: 'hbox', 
        align: 'middle'
    },

    // 自定义配置项
    buttonText: '查 询',	//提交按钮的名称
   // buttonHeiht: 22,	//提交按钮的高度  
    // 自定义属性，无需配置
    theFilters: null,	//保存当前的筛选条件 JSON字串,便于其他请求使用
    theGroupers: null,	//保存当前的分组规则 JSON字串
    theSorters: null,	//保存当前的排序规则 JSON字串
    //特殊条件字段,便于导表button使用
    theGroupName: null,
    theTimes: null,
    store: null,	//自定义的关联store
     margin:'5 0 5 0',
    initComponent: function(agruments) {
    	var me = this;  
    	if(this.config){
        	Ext.apply(this , this.config)
    	}
    	var searchButton = Ext.create('Ext.container.Container', {
			layout: {
					type: 'vbox',
					padding: '5 5 '+this.buttonHeiht/5+' 10',
					pack: 'center',
					align: 'center'
			},
			items:{
	            xtype: 'button',
	            height: me.buttonHeiht,
	            text: me.buttonText,
	            iconCls : 'button-search',
	            listeners: {
		            click: function (button) {	
		            	if(!me.getForm().isValid()){
							Ext.Msg.alert('错误','有不符合要求的条件项');
							return null;
						}
		            	if(Ext.isEmpty(me.store)){
			            	var grid = me.nextSibling('grid');
			            	if(grid == null){
			            		grid = me.previousSibling('grid');
			            	}
			            	if(grid == null){
			            		Ext.Msg.alert('错误','没找到关联的grid组件！');
			            		return;
			            	}
			            	me.store = grid.getView().getStore();
		            	}
		            	// 得到绑定的store
		            	
		            	/** 将form绑定到store */
		            	me.store.searchForm = me;
		            	
		            	// 表单条件筛选数组
		            	var filters = [];
		            	var startDate, endDate;
		            	
		            	// 得到所有的表单组件
		            	var allFields = me.query('field');
		            	for(var i=0; i<allFields.length; i++){
		            		var f = allFields[i];
		            		if (f.xtype == "grouptreecombo") {//扩展的分组树下拉框		            			
			    				var v = f.value;
			    				if (Ext.isEmpty(v)){
			    					filters[filters.length] = {property:f.name, value:''};
			    				}
			    				else{
			    					filters[filters.length] = {property:f.name, value:v};
			    					me.theGroupName = f.getRawValue();
			    				}		    				
			    				continue;
			    			}
		            		// 其它field值为空直接舍弃
		            		if (Ext.isEmpty(f.value)){
		            			continue;
		            		}
		            		
		            		if(f.xtype == "textfield"){
		            			if ("maxTime" == f.name || "minTime" == f.name) {
		            				filters[filters.length] = {property:f.name, value:f.value};
		            			}else{
		            				filters[filters.length] = {property:f.name, value:'%' + f.value + '%'};
		            			}
		            			
		            		}else if (f.xtype == "datefield") {
			    				//日期对象在查询时都处理为2012-01-01这种格式
			    				var v = f.value;
			    				if (Ext.isDate(v)) {
			    					v = Ext.Date.format(v,'Y-m-d');
			    					//去除00
			    					if (':00' == v.substr(v.length - 3)) v = v.substr(0,v.length - 3);
			    					if (':00' == v.substr(v.length - 3)) v = v.substr(0,v.length - 3);
			    					if (' 00' == v.substr(v.length - 3)) v = v.substr(0,v.length - 3);
			    				}
			    							    				
			    				//用于处理时间的大小关系，以时间为条件的值要求startDate < endDate
			    				//如果不想要工具处理这种判断可以将startDate，endDate其中一个起不同的名字
			    				if ("startDate" == f.name) {
			    					startDate = v
			    					me.theTimes = v;
			    				};
			    				if ("endDate" == f.name) {
			    					endDate = v;
			    					me.theTimes += ' 至  ' + v;
			    				}
			    				filters[filters.length] = {property:f.name, value:v};
			    			}else if(f.xtype == "datetimefield") {
			    				var v = f.getRawValue();
			    				if ("startDate" == f.name) {    //导表 而且searchForm中包含了datetimefield
			    					startDate = v
			    					me.theTimes = v;
			    				};
			    				if ("endDate" == f.name) {
			    					endDate = v
			    					me.theTimes += ' 至  ' + v;
			    				}
			    				filters[filters.length] = {property:f.name, value: v};
			    			}else {
			    				filters[filters.length] = {property:f.name, value:f.value};
			    			}
		            	}
		            	
		            	if (Ext.isEmpty(startDate) == false && Ext.isEmpty(endDate) == false) {
			    			if (startDate > endDate) {
			    				Ext.Msg.alert('提示', '开始时间不可以大于结束时间');
			    				return;
			    			}
			    		}
			    		
		            	if (filters.length > 0) {		            			            		
		            		me.store.suspendEvents();// 暂停所有事件
		            		me.store.remoteFilter = false;	//阻止store自动load
			    			me.store.clearFilter(true);				    			
		            		me.store.filter(filters);
		            		me.store.remoteFilter = true;
		            		me.store.resumeEvents();// 恢复所有事件			            				            		
		            	} else {//无条件查询
		            		me.store.suspendEvents();
			            	me.store.clearFilter(true);
			            	me.theFilters = null;
			            	me.store.resumeEvents();
		            	}
		            	
		            	me.store.proxy.extraParams = {};
		            	
		            	// 加载第一页数据
	            		me.store.loadPage(1, {
		            		scope : this,
							callback : function(records, operation, success) {
								if (success) {
									if (records.length == 0) {
										Ext.Msg.alert('提示', '没有符合条件的数据!');
										me.store.proxy.extraParams.count = 0;
									}
									//记录点击查询按钮时传递的参数，用于下次翻页;
									var p = operation.params; 
									if(p.filter)
										me.theFilters = p.filter;
									if(p.group)
										me.theGroupers = p.group;
									if(p.sort)
										me.theSorters = p.sort;
									// 提供总记录数，可免去翻页查询时后台再次执行记录数查询语句
									me.store.proxy.extraParams.count = me.store.getTotalCount();
								} else {//失败不需要提示，有AJAX统一处理提示
									// 查询失败要清空原所有额外参数
									me.store.proxy.extraParams = {};
								}
							}
		            	});
		            }
	            }
	        }
		});
    	
    	this.items[this.items.length] = searchButton;

        me.callParent(arguments);
    }
});