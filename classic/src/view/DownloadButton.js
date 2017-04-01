/**
 * 报表下载按钮.
 * 统一处理报表下载请求逻辑
 * 只能用在grid中
 * @author LJY
 * @since 2013.9.4
 */
Ext.define('Admin.view.DownloadButton', {
    extend: 'Ext.button.Button',
    alias : 'widget.downloadButton',
  
    text : '导出Excel表',
    iconCls : 'button-download',
    excelConfig: null,	//必选。Admin.view.ExcelConfig,自定义EXCEL报表配置对象
    actionType:null,
    initComponent: function() {
    	this.addListener('click', this.clickHandler, this);
        this.callParent(arguments);
    },
    
    clickHandler: function(btn, e, eOpts){
    	if(Ext.isEmpty(btn.excelConfig)){
    		Ext.Msg.alert('错误','请先提供报表配置项！');
    		return;
    	}else if (Ext.isEmpty(btn.excelConfig.columnNames)){
    		Ext.Msg.alert('错误','报表配置项不完整！');
    		return;
    	}
    	console.log('excelConfig=%o', btn.excelConfig);
    	
    	var grid = btn.up('grid');
    	var store = grid.getStore();
    	var searchForm = store.searchForm;
    	
    	if(store.getTotalCount() == 0){
    		Ext.Msg.alert('错误','请先进行查询或统计操作以获取有效数据！');
    		return;
    	}
    	//得到事先定义好的form
    	var f = Ext.getDom("downloadExcelForm");
    	f.method = 'post';
    	if(btn.excelConfig.title.indexOf("派单费用报表") != -1 ){
    		f.action = store.proxy.url + "/excel/_do";
    	}else{
    		f.action = store.proxy.url + "/excel";
    	}
    	
    	//f.target = 'exp_frame';
    	
    	if(searchForm.theFilters){
    		var theFilters = searchForm.theFilters;
    		//add by luojiajun 可以指定actionType
   		if(btn.actionType ){
    			theFilters = Ext.decode(theFilters);
    			Ext.Array.each(theFilters ,function(searchCondition){
					 if('actionType' == searchCondition.property){  //查找熟悉
						 searchCondition.value = btn.actionType;
						 return;
					 }
					 
				});
    			theFilters = Ext.encode(theFilters);
    		}
    		if(!Ext.isEmpty(btn.convertSearchProperty)){
    			theFilters = Ext.decode(theFilters);
    			var convertPro = btn.convertSearchProperty;
    			for(var i = 0 ; i < convertPro.length ; i++){
    				Ext.Array.each(theFilters ,function(searchCondition){
    					 if(convertPro[i].findPro == searchCondition.property){  //查找熟悉
    						 searchCondition.property = convertPro[i].replacePro;
    						 return ;
    					 }
    					 
    				})
    			}
    			theFilters = Ext.encode(theFilters);
    		}
    		f.filter.value = theFilters;
    	}else{
    		f.filter.value = '';
    	}
    	
    	if(searchForm.theGroupers){
    		f.group.value = searchForm.theGroupers;
    	}else{
    		f.group.value = '';
    	}
    	
    	if(searchForm.theSorters){
    		f.sort.value = searchForm.theSorters;
    	}else{
    		f.sort.value = '';
    	}
    	
    	f._dc.value = (new Date()).getTime();
    	
    	f.columnNames.value = Ext.JSON.encode(btn.excelConfig.columnNames);
    	f.title.value = btn.excelConfig.title;
    	
    	if(searchForm.theTimes){
    		f.times.value = searchForm.theTimes;
    	}else if(btn.excelConfig.times){
    		f.times.value = btn.excelConfig.times;
    	}else{
    		f.times.value = '';
    	}
    	
    	if(searchForm.theGroupName){
    		f.companyName.value = searchForm.theGroupName;
    	}else if(btn.excelConfig.companyName){
    		f.companyName.value = btn.excelConfig.companyName;
    	}else{
    		f.companyName.value = Admin.app.getUserInfo().groupName; //从前台取操作员所属分组名
    	}
    	
    	f.submit();
    }
});