/**
 * 报表下载按钮.
 * 统一处理报表下载请求逻辑
 * 只能用在grid中
 * @author LJY
 * @since 2013.9.4
 */
Ext.define('Admin.view.DownloadButtonToHengX', {
    extend: 'Ext.button.Button',
    alias : 'widget.downloadButtonToHengX',
  
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
    	
    	//得到事先定义好的form
    	var f = Ext.getDom("downloadExcelForm");
    	f.method = 'post';
    	if(btn.excelConfig.title.indexOf("派单费用报表") != -1 ){
    		f.action = store.proxy.url + "/excel/_do";
    	}else{
    		f.action = store.proxy.url + "/excel";
    	}
    	
    	//f.target = 'exp_frame';
    	
    	
    	f.columnNames.value = Ext.JSON.encode(btn.excelConfig.columnNames);
    	f.title.value = btn.excelConfig.title;
    	
    	
    	
    	f.submit();
    }
});