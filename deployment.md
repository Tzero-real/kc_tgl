# 部署教程

1. 安装微信开发者工具，git管理工具，Node.js运行环境

2. 在git中执行以下命令

   ```
   git clone https://github.com/Tzero-real/kc_tgl.git
   ```
   
3. 注册并登录微信开发者工具

4. 导入工程目录

   ```
   |--miniprogram
   |--cloudfuncitons
   |--project.config.json
   ```
   
5. 单击云开发按钮，注册一个云环境

6. 右键点击cloudfunctions 指定云开发环境，然后点击上传并部署所有的云函数，单击sub云函数，修改templateId成自己的ID（微信公众平台后台申请），将云函数部署到微信云平台

7. 在云开发平台上点击数据库，新建kc_common ,kc_form, kc_notice, kc_manager集合

8. 在云开发平台单击云存储，新建文件夹：main，common，img，ban，并将附件文件夹中的图片上传至ban文件夹

9. 在搜索框输入：“abd27dd45f36862c009c9aa701c48126”，替换成自己的templateId（微信公众平台后台申请）
10. 编译运行微信小程序
# 联系方式

邮箱：tglstudio@163.com（请注明来意）
