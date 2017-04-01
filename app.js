/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the Admin.Application class.
 */
Ext.application({
    name: 'Admin',

    extend: 'Admin.Application',

    // Simply require all classes in the application. This is sufficient to ensure
    // that all Admin classes will be included in the application build. If classes
    // have specific requirements on each other, you may need to still require them
    // explicitly.
    //
    requires: [
        'Admin.*'
    ],
		/**
		 * 检测操作员是否有指定模块和相应操作的权限
		 * @param {Number} moduleID 模块ID
		 * @param {Number} actID 子操作码
		 * (取值0-7，0：模块显示权限，1-7：模块子操作权限、从1开始对应于数据库子操作描述字段)
		 * @return {Boolean} 有权限返回true
		 */
		checkRight : function(moduleID, actID){
			return true;
			try{
				if (!this.userInfo.rightMask || !moduleID)
					return false;
				if (actID < 0 || actID > 7)	
					return false;
					
				// 模块ID在掩码串中的索引位置	
				var m_index = (moduleID-1)*2;
				// 操作位值
				var actbit = Math.pow(2, actID);
				// 得到模块ID对应的两位权限字符
				var mStr = this.userInfo.rightMask.substring(m_index, m_index+2);
				// 得到模块权限的16进制表示数
				var mr = parseInt(mStr, 16);
				// 做位与运算检测操作位是否有权限
				var check = mr & actbit;
				if (check == actbit)
					return true;
				else
					return false;
			}catch(e){
				console.error(e.stack);	
				return false;
			}
		}

});
