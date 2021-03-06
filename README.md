# Form1022test

这是一个小型的测试项目。

组成：基于dotnet 3.0的WebApi项目；基于React.js的前端项目

**用法：**

1）进入WebApi项目，执行dotnet run，然后将wwwroot文件夹拷贝到WebApi/bin/Debug/netcoreapp3.0 文件夹；或者

2）运行WebApi项目，然后再运行ClientUI项目（进入文件夹，先npm run install，再npm run start，建议用yarn install和yarn start）

**流程及原理：**

1、首页：服务端将pdf文件夹内的文件名列表发送到客户端进行显示（Form1022Controller/GetAllForms）；

2、点击文件列表中的File 1022，此时服务端会分析pdf内容并列出文件具有的页码总数(Form1022Controller/GetAllForms)；

3、点击相应的页码（第3页），服务端会调用Form022Controller/GetPage，该方法首先查找是否有生成好的Form说明（json文件），如果有则直接返回，如果没有则拆分出单页，解析该页中的Form Fields元素，生成Form说明，并将信息返回，客户端根据信息进行页面初始化，显示表单；

4、表单中的保存按钮，调用了Form1022Controller/PostPageForm方法，服务端将提交上来的名/值对与Form说明（json文件）对比，并保存值到json中。

5、表单中的导出pdf功能，调用了Form1022Controller/GetFile方法，该方法从json文件中取出Form说明和值，填充到第3步的单页中并传送到客户端。

项目中没有使用数据库，用了json来保存, There are tow json file: one for form config, another for user form data.

**已知问题：**

~~1、pdf文件中的checkbox/radiobox赋值有问题，无法正确赋值和显示，可能是因为我不太熟悉iText库的原因；~~

2、没来得及写单元测试，也没有进行完备的出错处理；

~~3、打开填写好的pdf文件，不能正确显示文件名；~~

**花费总时间：**

大约13-16个工作小时，其中大部分用在熟悉iText类库，以及前端页面的调试。



以下是开发心得

------

**原需求**比较简单，大意是从UI中取得数据，然后保存，并可以根据官方固定格式的pdf form进行回填和下载。

考虑到原需求的客户性质以及业务性质，我从两个方面做了一些业务扩展。

**功能扩展：**

这个业务要运行在互联网上，那么潜在含义就是7*24的性质，加上客户并没专门的IT支持团队，那么功能设计之初就要考虑数据源pdf form变更带来的风险。

为了实现能够动态绑定pdf form,减少系统硬升级带来的中断，需要扩展如下业务：

1、将用户分为客户/管理员，提供不同的UI及权限，其中管理员负责维护官方的pdf；客户根据身份id对自己的个人信息进行CRUD；

2、管理员维护官方pdf，系统从其form中自动抽离形成Form-Field结构，并形成针对该pdf Form的基础Schema；

3、根据基础Schema，自动生成前端页面，并提供面对管理员的管理功能，可以增加前端校验规则、进行前端页面测试；

**实现过程及结果：**

由于时间较短，并没有实现上文中所有的功能，只实现了部分关键Feature，要点如下：

1、从pdf中抽取单页，并读取该页上的form信息，形成form json描述；

2、使用React.js构建简单前端，用以填写用户信息；

3、使用配置文件，将前端与form json结构进行匹配，以存储客户信息；

4、根据客户信息回填pdf form并可以下载pdf文件；

5、基于dotnetcore 3.0的C# WebAPI项目，以及包含在项目内的若干工具类；

**需要特别注意的地方：**

1、为了兼容dotnet core，本项目使用了第三方组件iText7，该控件使用AGPL和商业双授权，如果要保持闭源则需要购买授权，可能会增加成本；如果基于.NET Framework进行开发部署，可换为iTextSharp，此处节省部分费用，带来的是开发工作效率降低。

2、本次实现是一个基于单用户的demo，暂时没有使用任何数据库，而使用json文件存储各类信息。如果要作为正式功能上线，建议使用DocumentDB。

3、官方pdf时有升级，随之带来的是客户业务需要按pdf版本管理，那么很有必要在系统中增加pdf版本管理功能，并将版本信息与客户业务绑定（需根据官方业务要求开发）。