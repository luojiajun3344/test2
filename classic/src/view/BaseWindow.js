/**
 * 窗口基类
 * 自适应布局
 * 头部不可托出界面边缘，无边框
 */
Ext.define('Admin.view.BaseWindow', {
	extend : 'Ext.window.Window',
    layout: 'fit',
    border: 0,
	constrainHeader: true
});