/**
 * Excel报表配置项规范类
 * @author LJY
 * @since 2013.9.5
 */
Ext.define('Admin.view.ExcelConfig', {
    extend: 'Ext.Component',
    alias : 'widget.excelConfig',

    /**
     * 格式：columnNames: [
     *     {name:'列名称', key:'store中对应field名', width:20(number), align:'left||center||right', merge: true},
     *     {name:'业户名称', key:'groupName', width:20, align:'left', merge: true},...
     * ]
     * 说明：
     *  width：列宽度，非像素宽度，具体宽度请根据实际测试来配置
     *  merge：列单元格重复值是否合并。项只允许一列为true,配置多个只有第一个有效。
     * 
     */
    columnNames: [],	//必选。报表列名数组，顺序相关，包含宽度值、文本样式、列是否合并等
    title: '报表标题',	//必选
    times: null,		//可选。报表数据时间范围：'开始时间 至 结束时间'，有时间条件的统计查询模块才有效
    companyName: null,	//可选。公司名称，默认为分组名称
    
    initComponent: function() {
        this.callParent();
    }

});