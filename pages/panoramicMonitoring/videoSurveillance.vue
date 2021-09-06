<template>
    <div>
        <div
            class="fixedConstructionSite-tree"
            style="width: 10%; float: left; height: 100%; boder: 1 soild black"
        >
            <el-tree
                :props="props"
                :load="loadNode"
                @node-click="nodeClickFn"
                lazy
            >
            </el-tree>
        </div>
        <div
            class="video-player"
            style="width: 72%; float: left; height: 100%"
            :style="treeStyle"
        >
            <span
                id="showDiv"
                style="color: #666; font-size: 12px; display: none"
                ><a href="<%=basePath%>statics/WebComponents.zip"
                    >控件未加载，请使用IE、360或者QQ的兼容模式，若未安装请点击下载，安装完成后，启用插件设置刷新页面生效&nbsp;&nbsp;</a
                ></span
            >
            <div id="divPlugin" class="divPlugin"></div>
            <!-- <div id="divPlugin" class="divPlugin" ref="divPlugin" v-if="plugin">
        </div> -->
        </div>
        <div style="width: 17%; float: left; height: 100%; max-width: 250px">
            <div class="operation" style="width: 100%">
                <div class="operation_left">
                    <div class="top_btn" id="up"></div>
                    <div class="right_btn" id="right"></div>
                    <div class="bottom_btn" id="down"></div>
                    <div class="left_btn" id="left"></div>
                </div>
                <div class="operation_right">
                    <div class="zoom">
                        <span class="operation_name">缩放：</span>
                        <span class="work_icon">
                            <span class="enlarge_icon" id="zoomIn">
                                <div></div>
                            </span>
                            <span class="narrow_icon" id="zoomOut">
                                <div></div>
                            </span>
                        </span>
                    </div>
                    <div class="aperture">
                        <span class="operation_name">光圈：</span>
                        <span class="work_icon">
                            <span class="strong_icon" id="aperturea">
                                <div></div>
                            </span>
                            <span class="weak_icon" id="aperturem">
                                <div></div>
                            </span>
                        </span>
                    </div>
                    <div class="focusing">
                        <span class="operation_name">聚焦：</span>
                        <span class="work_icon">
                            <span class="near_icon" id="focusfar">
                                <div></div>
                            </span>
                            <span class="far_icon" id="focusnear">
                                <div></div>
                            </span>
                        </span>
                    </div>
                    <div class="speed">
                        <span class="operation_name">云台速度：</span
                        ><span>
                            <select id="ptzspeed" class="sel">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4" selected>4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </span>
                    </div>
                </div>
                <hr
                    style="
                        width: 100%;
                        border: 1px solid #eee;
                        top: 20px;
                        position: relative;
                    "
                />
                <div
                    style="
                        width: 100%;
                        height: 30px;
                        text-align: center;
                        margin-left: 15px;
                    "
                >
                    <el-button
                        type="button"
                        id="yfpbtn"
                        class="layui-btn layui-btn-normal"
                        style="width: 100px"
                        >一分屏</el-button
                    >
                    <el-button
                        type="button"
                        id="sfpbtn"
                        class="layui-btn layui-btn-normal"
                        style="width: 100px"
                        >四分屏</el-button
                    >
                </div>
                <div
                    style="
                        width: 100%;
                        height: 30px;
                        text-align: center;
                        margin-left: 15px;
                    "
                >
                    <el-button
                        type="button"
                        id="jfpbtn"
                        class="layui-btn layui-btn-normal"
                        style="width: 100px"
                        >九分屏</el-button
                    >
                    <el-button
                        type="button"
                        id="slfpbtn"
                        class="layui-btn layui-btn-normal"
                        style="width: 100px"
                        >十六分屏</el-button
                    >
                </div>
                <div
                    style="
                        width: 100%;
                        height: 30px;
                        text-align: center;
                        margin-left: 15px;
                    "
                >
                    <el-button
                        type="button"
                        id="closePlay"
                        class="layui-btn layui-btn-normal"
                        style="width: 100px"
                        >关闭预览</el-button
                    >
                    <el-button
                        type="button"
                        id="closeAllPlay"
                        class="layui-btn layui-btn-normal"
                        style="width: 100px"
                        >全部关闭</el-button
                    >
                </div>
                <div
                    style="
                        width: 100%;
                        height: 30px;
                        text-align: center;
                        margin-left: 15px;
                    "
                >
                    <el-button
                        type="button"
                        id="jtbtn"
                        class="layui-btn layui-btn-normal"
                        style="width: 100px"
                        >抓图</el-button
                    >
                    <el-button
                        type="button"
                        id="qpbtn"
                        class="layui-btn layui-btn-normal"
                        style="width: 100px"
                        >全屏</el-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "videoPlayer",
    computed: {
        treeStyle() {
            return { height: document.body.clientHeight - 140 + "px" };
        },
    },
    data() {
        return {
            IP: "192.168.1.101",
            Port: 80,
            Username: "admin",
            Password: "Jy123456",
            videoType: 2,
            plugin: true,
            iWidth: "100%",
            iHeight: "100%",
            webVideo: {},
            iStreamType: 1,
            iProtocol: 1,
            bZeroChannel: false,
            xmlDocData: {},
            oChannels: [],
            g_iWndIndex: 0, //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
            videoNum: "",
            props: {
                label: "objName",
                children: "zones",
                isLeaf: "leaf",
                g_bPTZAuto: false,
                iPTZSpeed: 5,
            },
        };
    },
    created() {},
    mounted() {
        this.videoInitPlugin();
        var that = this;
        $("#up").on("mousedown", function () {
            that.mouseDownPTZControl(1);
        });
        $("#up").on("mouseup", function () {
            that.mouseUpPTZControl();
        });

        $("#right").on("mousedown", function () {
            that.mouseDownPTZControl(4);
        });
        $("#right").on("mouseup", function () {
            that.mouseUpPTZControl();
        });

        $("#down").on("mousedown", function () {
            that.mouseDownPTZControl(2);
        });
        $("#down").on("mouseup", function () {
            that.mouseUpPTZControl();
        });

        $("#left").on("mousedown", function () {
            that.mouseDownPTZControl(3);
        });
        $("#left").on("mouseup", function () {
            that.mouseUpPTZControl();
        });

        $("#zoomIn").on("mousedown", function () {
            that.PTZZoomIn();
        });
        $("#zoomIn").on("mouseup", function () {
            that.PTZZoomStop();
        });

        $("#zoomOut").on("mousedown", function () {
            that.PTZZoomout();
        });
        $("#zoomOut").on("mouseup", function () {
            that.PTZZoomStop();
        });

        $("#aperturea").on("mousedown", function () {
            that.PTZIrisIn();
        });
        $("#aperturea").on("mouseup", function () {
            that.PTZIrisStop();
        });

        $("#aperturem").on("mousedown", function () {
            that.PTZIrisOut();
        });
        $("#aperturem").on("mouseup", function () {
            that.PTZIrisStop();
        });

        $("#focusfar").on("mousedown", function () {
            that.PTZFocusIn();
        });
        $("#focusfar").on("mouseup", function () {
            that.PTZFoucusStop();
        });

        $("#focusnear").on("mousedown", function () {
            that.PTZFoucusOut();
        });
        $("#focusnear").on("mouseup", function () {
            that.PTZFoucusStop();
        });

        $("#ptzspeed").on("change", function (val) {
            that.iPTZSpeed = parseInt($("#ptzspeed").val());
        });

        $("#yfpbtn").on("click", function (val) {
            that.changeWnNum(1);
        });
        $("#sfpbtn").on("click", function (val) {
            that.changeWnNum(2);
        });
        $("#jfpbtn").on("click", function (val) {
            that.changeWnNum(3);
        });
        $("#slfpbtn").on("click", function (val) {
            that.changeWnNum(4);
        });

        $("#closePlay").on("click", function (val) {
            that.clickStopRealPlay(that.g_iWndIndex);
        });

        $("#jtbtn").on("click", function (val) {
            that.clickCapturePic();
        });

        $("#slxbtn").on("click", function (val) {
            $("#slxbtn").css("display", "none");
            $("#elxbtn").css("display", "");
            that.clickStartRecord();
        });

        $("#elxbtn").on("click", function (val) {
            $("#slxbtn").css("display", "");
            $("#elxbtn").css("display", "none");
            that.clickStartRecord();
        });
        $("#qpxbtn").on("click", function (val) {
            $("#slxbtn").css("display", "");
            $("#elxbtn").css("display", "none");
            that.clickFullScreen();
        });

        $("#closeAllPlay").on("click", function (val) {
            var length = 1;
            if (that.videoType == 1) {
                length = 1;
            } else if (that.videoType == 2) {
                length = 4;
            } else if (that.videoType == 3) {
                length = 9;
            } else if (that.videoType == 3) {
                length = 16;
            } else {
                length = 16;
            }
            for (var index = 0; index < length; index++) {
                that.g_iWndIndex = index;
                WebVideoCtrl.GetSelectWndInfo(
                    '<?xml version="1.0"?><RealPlayInfo><SelectWnd>' +
                        that.g_iWndIndex +
                        "</SelectWnd><ChannelNumber>-1</ChannelNumber><RealPlaying>0</RealPlaying><Recording>0</Recording></RealPlayInfo>"
                );
                that.clickStopRealPlay(that.g_iWndIndex);
            }
            that.g_iWndIndex = 0;
            WebVideoCtrl.GetSelectWndInfo(
                '<?xml version="1.0"?><RealPlayInfo><SelectWnd>' +
                    that.g_iWndIndex +
                    "</SelectWnd><ChannelNumber>-1</ChannelNumber><RealPlaying>0</RealPlaying><Recording>0</Recording></RealPlayInfo>"
            );
        });
    },
    destroyed() {
        var that = this;
        var length = 1;
        if (that.videoType == 1) {
            length = 1;
        } else if (that.videoType == 2) {
            length = 4;
        } else if (that.videoType == 3) {
            length = 9;
        } else if (that.videoType == 3) {
            length = 16;
        } else {
            length = 16;
        }
        for (var index = 0; index < length; index++) {
            that.g_iWndIndex = index;
            WebVideoCtrl.GetSelectWndInfo(
                '<?xml version="1.0"?><RealPlayInfo><SelectWnd>' +
                    that.g_iWndIndex +
                    "</SelectWnd><ChannelNumber>-1</ChannelNumber><RealPlaying>0</RealPlaying><Recording>0</Recording></RealPlayInfo>"
            );
            that.clickStopRealPlay(that.g_iWndIndex);
        }
        that.g_iWndIndex = 0;
        WebVideoCtrl.GetSelectWndInfo(
            '<?xml version="1.0"?><RealPlayInfo><SelectWnd>' +
                that.g_iWndIndex +
                "</SelectWnd><ChannelNumber>-1</ChannelNumber><RealPlaying>0</RealPlaying><Recording>0</Recording></RealPlayInfo>"
        );
        $("#divPlugin").html("");
    },
    methods: {
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([
                    {
                        objName: "视频设备树",
                        objType: "line",
                        objId: "",
                    },
                ]);
            } else if (node.level === 1 || node.level == 2) {
                let objType = "line";
                if (node.level === 1) {
                    objType = "line";
                } else {
                    objType = "tower";
                }
                $axios({
                    url: "/tpiim/line/getLineNameTreeList",
                    type: "post",
                    data: {
                        objType: objType,
                        objId: node.data.objId,
                    },
                }).then((data) => {
                    if (data.successful) {
                        resolve(data.resultValue);
                    } else {
                        this.$message.error(data.resultHint);
                    }
                });
            } else if (node.level === 3) {
                $axios({
                    url: "/tpiim/selfVideoDeviceAccess/getVideoNameTreeList",
                    type: "post",
                    data: {
                        type: "1",
                        parent_id: node.data.objId,
                    },
                }).then((data) => {
                    if (data.successful) {
                        resolve(data.resultValue);
                    } else {
                        this.$message.error(data.resultHint);
                    }
                });
            } else if (node.level === 4) {
                return resolve([]);
            }
        },
        nodeClickFn(data, node) {
            if (node.level === 4) {
                $axios({
                    url:
                        "/tpiim/selfVideoDeviceAccess/getSelfVideoDeviceAccess",
                    type: "get",
                    data: {
                        objId: node.data.objId,
                    },
                })
                    .then((data) => {
                        var d = data.resultValue;
                        if (d != null) {
                            this.IP = d.ip;
                            this.Port = parseInt(d.us_port);
                            this.Username = d.user_name;
                            this.Password = d.us_cipher;
                            this.clickLogin();
                            this.getChannelInfo();
                        } else {
                            this.$message.error("获取监控设备信息失败");
                        }
                    })
                    .catch((error) => {
                        this.$message.error("获取监控设备信息失败");
                    });
            }
        },
        videoInitPlugin() {
            var iRet = WebVideoCtrl.I_CheckPluginInstall();
            if (iRet === -1) {
                $("#showDiv").css("display", "");
                alert(
                    "您还未安装或未启用过插件，请安装或启用WebComponentsKit.exe插件！"
                );
                return;
            }
            this.initPlugin();
        },
        //插件初始化
        initPlugin() {
            var that = this;
            WebVideoCtrl.I_InitPlugin(this.iWidth, this.iHeight, {
                bWndFull: true, //是否支持单窗口双击全屏，默I_CheckPluginInstall
                iWndowType: that.videoType,
                cbSelWnd: function (xmlDoc) {
                    that.g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
                },
                cbDoubleClickWnd: function (iWndIndex, bFullScreen) {
                    var szInfo = "当前放大的窗口编号：" + iWndIndex;
                    if (!bFullScreen) {
                        szInfo = "当前还原的窗口编号：" + iWndIndex;
                    }
                },
                cbEvent: function (iEventType, iParam1, iParam2) {
                    if (2 == iEventType) {
                        // 回放正常结束
                        consoel.log("窗口" + iParam1 + "回放结束！");
                    } else if (-1 == iEventType) {
                        consoel.log("设备" + iParam1 + "网络错误！");
                    } else if (3001 == iEventType) {
                        //clickStopRecord(g_szRecordType, iParam1);
                    }
                },
                cbRemoteConfig: function () {
                    consoel.log("关闭远程配置库！");
                },
                cbInitPluginComplete: function () {
                    //WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");

                    // 检查插件是否最新
                    if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
                        alert(
                            "检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！"
                        );
                        return;
                    }
                },
            });
            WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
            // 检查插件是否最新
            // if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
            //     alert("检测到新的插件版本，请双击WebComponents.exe插件，进行升级！");
            //     // return;
            // }
            //this.clickLogin()
            //this.getChannelInfo();
        },
        clickLogin(data) {
            var that = this;
            var szDeviceIdentify = that.IP;
            var iRet = WebVideoCtrl.I_Logout(szDeviceIdentify);
            WebVideoCtrl.I_Login(
                that.IP,
                1,
                that.Port,
                that.Username,
                that.Password,
                {
                    success: function (xmlDoc) {
                        console.log("开始预览"); //不能删除
                        that.getChannelInfo();
                        that.initPlay(that.IP);
                    },
                    error: function () {
                        console.log("login error");
                    },
                }
            );
        },
        //获取通道
        getChannelInfo() {
            var that = this;
            // 模拟通道
            WebVideoCtrl.I_GetAnalogChannelInfo(that.IP, {
                async: false,
                success: function (xmlDoc) {
                    var _oChannels = $(xmlDoc).find("VideoInputChannel");
                    if (_oChannels.length > 0) {
                        that.oChannels = _oChannels;
                    }
                    //nAnalogChannel = oChannels.length;
                    console.log("获取模拟通道成功！" + that.oChannels.length);
                },
                error: function () {
                    // console.log("获取模拟通道失败！"+WebVideoCtrl.I_GetLastError())
                },
            });
            // 数字通道
            WebVideoCtrl.I_GetDigitalChannelInfo(that.IP, {
                async: false,
                success: function (xmlDoc) {
                    var _oChannels = $(xmlDoc).find("InputProxyChannelStatus");
                    //that.$emit('func',oChannels)//获取数字通道传给父组件
                    if (_oChannels.length > 0) {
                        that.oChannels = _oChannels;
                    }
                    console.log("获取数字通道失败！" + that.oChannels.length);
                },
                error: function () {
                    WebVideoCtrl.I_GetLastError();
                },
            });
            // 零通道
            WebVideoCtrl.I_GetZeroChannelInfo(that.IP, {
                async: false,
                success: function (xmlDoc) {
                    var _oChannels = $(xmlDoc).find("ZeroVideoChannel");
                    if (_oChannels.length > 0) {
                        that.oChannels = _oChannels;
                    }
                    console.log("获取模零通道成功！" + that.oChannels.length);
                },
                error: function () {
                    // console.log("获取零通道失败！"+WebVideoCtrl.I_GetLastError())
                },
            });
        },
        //初始化视频，为了让用户进来就可以看到视频播放
        initPlay(IP) {
            var that = this;
            let szIP = IP; //ip地址
            var iStreamType = 1;
            console.log(that.g_iWndIndex);
            WebVideoCtrl.GetSelectWndInfo(
                '<?xml version="1.0"?><RealPlayInfo><SelectWnd>' +
                    that.g_iWndIndex +
                    "</SelectWnd><ChannelNumber>-1</ChannelNumber><RealPlaying>0</RealPlaying><Recording>0</Recording></RealPlayInfo>"
            );
            //$(this.oChannels[0]).find("id").eq(0).text()
            //循环16次是因为插件分屏最大为4x4（可以根据情况而定）
            var iChannelID = 1; //parseInt($(that.oChannels[i]).find("id").eq(0).text(), 10);
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(that.g_iWndIndex);
            if (szIP == "") {
                return;
            }
            if (oWndInfo != null) {
                // 已经在播放了，先停止
                that.clickStopRealPlay(that.g_iWndIndex);
            }
            var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
                iStreamType: iStreamType,
                iChannelID: iChannelID,
                iWndIndex: that.g_iWndIndex,
                bZeroChannel: false,
            });
            if (0 == iRet) {
                console.log("开始预览成功！");
                that.g_iWndIndex = parseInt(that.g_iWndIndex) + 1;
                WebVideoCtrl.GetSelectWndInfo(
                    '<?xml version="1.0"?><RealPlayInfo><SelectWnd>' +
                        that.g_iWndIndex +
                        "</SelectWnd><ChannelNumber>-1</ChannelNumber><RealPlaying>0</RealPlaying><Recording>0</Recording></RealPlayInfo>"
                );
            } else {
                console.log("开始预览失败！");
            }
        },
        // 点击查看具体哪个监控
        startRealPlay(oChannels) {
            let that = this;
            let szIP = this.IP; //ip地址
            let iChannelID = oChannels; //播放通道号
            var iStreamType = 1;
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(that.g_iWndIndex);
            if (oWndInfo != null) {
                // 已经在播放了，先停止
                WebVideoCtrl.I_Stop();
            }
            WebVideoCtrl.I_StartRealPlay(szIP, {
                iStreamType: iStreamType,
                iChannelID: iChannelID,
            });
        },
        mouseDownPTZControl(iPTZIndex) {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                bZeroChannel = false,
                iPTZSpeed = this.iPTZSpeed,
                bStop = false;

            if (bZeroChannel) {
                // 零通道不支持云台
                return;
            }

            if (oWndInfo != null) {
                if (9 == iPTZIndex && this.g_bPTZAuto) {
                    iPTZSpeed = 0; // 自动开启后，速度置为0可以关闭自动
                    bStop = true;
                } else {
                    this.g_bPTZAuto = false; // 点击其他方向，自动肯定会被关闭
                    bStop = false;
                }
                WebVideoCtrl.I_PTZControl(iPTZIndex, bStop, {
                    iPTZSpeed: iPTZSpeed,
                    success: function (xmlDoc) {
                        if (9 == iPTZIndex) {
                            this.g_bPTZAuto = !this.g_bPTZAuto;
                        }
                        console.log(oWndInfo.szIP + " 开启云台成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + " 开启云台失败！");
                    },
                });
            }
        },
        mouseUpPTZControl() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(1, true, {
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 停止云台成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + " 停止云台失败！");
                    },
                });
            }
        },
        PTZZoomIn() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(10, false, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 调焦+成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  调焦+失败！");
                    },
                });
            }
        },
        PTZZoomout() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(11, false, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 调焦-成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  调焦-失败！");
                    },
                });
            }
        },
        PTZZoomStop() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(11, true, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 调焦停止成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  调焦停止失败！");
                    },
                });
            }
        },
        PTZFocusIn() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(12, false, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 聚焦+成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  聚焦+失败！");
                    },
                });
            }
        },
        PTZFoucusOut() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(13, false, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 聚焦-成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  聚焦-失败！");
                    },
                });
            }
        },
        PTZFoucusStop() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(12, true, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 聚焦停止成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  聚焦停止失败！");
                    },
                });
            }
        },
        PTZIrisIn() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);

            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(14, false, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 光圈+成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  光圈+失败！");
                    },
                });
            }
        },
        PTZIrisOut() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(15, false, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 光圈-成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  光圈-失败！");
                    },
                });
            }
        },
        PTZIrisStop() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
            if (oWndInfo != null) {
                WebVideoCtrl.I_PTZControl(14, true, {
                    iWndIndex: this.g_iWndIndex,
                    success: function (xmlDoc) {
                        console.log(oWndInfo.szIP + " 光圈停止成功！");
                    },
                    error: function () {
                        console.log(oWndInfo.szIP + "  光圈停止失败！");
                    },
                });
            }
        },
        changeWnNum(num) {
            this.videoType = num;
            WebVideoCtrl.I_ChangeWndNum(num); //分屏
        },
        clickStopRealPlay(num) {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(num),
                szInfo = "";
            if (oWndInfo != null) {
                var iRet = WebVideoCtrl.I_Stop();
                if (0 == iRet) {
                    szInfo = "停止预览成功！";
                } else {
                    szInfo = "停止预览失败！";
                }
                console.log(oWndInfo.szIP + " " + szInfo);
            }
        },
        clickCapturePic() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = "";
            if (oWndInfo != null) {
                var szChannelID = 1,
                    szPicName =
                        oWndInfo.szIP +
                        "_" +
                        szChannelID +
                        "_" +
                        new Date().getTime(),
                    iRet = WebVideoCtrl.I_CapturePic(szPicName);
                if (0 == iRet) {
                    szInfo = "抓图成功！";
                } else {
                    szInfo = "抓图失败！";
                }
                console.log(oWndInfo.szIP + " " + szInfo);
            }
        },
        clickStartRecord() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = "";
            if (oWndInfo != null) {
                var szChannelID = 1,
                    szFileName =
                        oWndInfo.szIP +
                        "_" +
                        szChannelID +
                        "_" +
                        new Date().getTime(),
                    iRet = WebVideoCtrl.I_StartRecord(szFileName);
                if (0 == iRet) {
                    szInfo = "开始录像成功！";
                } else {
                    szInfo = "开始录像失败！";
                }
                console.log(oWndInfo.szIP + " " + szInfo);
            }
        },
        clickStopRecord() {
            var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                szInfo = "";
            if (oWndInfo != null) {
                var iRet = WebVideoCtrl.I_StopRecord();
                if (0 == iRet) {
                    szInfo = "停止录像成功！";
                } else {
                    szInfo = "停止录像失败！";
                }
                console.log(oWndInfo.szIP + " " + szInfo);
            }
        },
        clickFullScreen() {
            WebVideoCtrl.I_FullScreen(true);
        },
    },
    //因为项目中需求，总公司要查看所有子公司的监控，所以做了个监听来切换查看各个子公司的监控
    watch: {
        //companyVideoData:{
        //    handler(val,oldval) {
        //           if(oldval){
        //               for(let i = 0;i<16;i++){
        //                    WebVideoCtrl.I_Stop(i);//停止正在播放的页面
        //                }
        //                this.$emit('func',"")
        //                WebVideoCtrl.I_Logout(oldval.IP)
        //                  this.clickLogin(this.companyVideoData)
        //             }
        //          },
        //              immediate:true,//关键
        //              deep:true
        //      },
        videoType: {
            handler(val, oldval) {
                if (oldval) {
                    WebVideoCtrl.I_ChangeWndNum(this.videoType); //分屏
                    this.initPlay();
                }
            },
            immediate: true, //关键
            deep: true,
        },
    },
};
</script>
<style  scoped>
.video-player {
    height: 100%;
}
.divPlugin {
    width: 100%;
    height: 100%;
    color: red;
    /* display: flex; */
    justify-content: center;
    align-items: center;
    font-size: 18px;
}
.down {
    width: 100%;
    height: 100%;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}
.down a {
    color: red;
}
.fixedConstructionSite-tree {
    border-right: 1px solid #eee;
    padding-right: 1px;
}
.operation {
    height: 200px;
    border-bottom: 1px solid #ddd;
}
.operation > div {
    display: inline-block;
    width: 80%;
    height: 140px;
    margin: 20px 0;
}
.operation .operation_left {
    background: url("~@/assets/images/icon4.png") center no-repeat;
    /* background: url(css/images/icon4.png) center no-repeat; */
    position: relative;
    margin-left: 40px;
}
.operation .operation_left > div {
    width: 30px;
    height: 30px;
    background: url("~@/assets/images/icons_new.png") -180px -50px no-repeat;
    /* background: url(css/images/icons_new.png) -180px -50px no-repeat; */
    position: absolute;
    cursor: pointer;
}
.operation .operation_left > div.top_btn {
    left: 43%;
    top: 5px;
}
.operation .operation_left > div.right_btn {
    background-position: -210px -50px;
    top: 40%;
    right: 20%;
}
.operation .operation_left > div.bottom_btn {
    background-position: -240px -50px;
    left: 43%;
    bottom: 5px;
}
.operation .operation_left > div.left_btn {
    background-position: -270px -50px;
    top: 40%;
    left: 20%;
}
.operation .operation_left > div.top_btn:hover {
    background-position: -180px -80px;
}
.operation .operation_left > div.right_btn:hover {
    background-position: -210px -80px;
}
.operation .operation_left > div.bottom_btn:hover {
    background-position: -240px -80px;
}
.operation .operation_left > div.left_btn:hover {
    background-position: -270px -80px;
}
.operation .operation_right {
    color: #666;
    padding-left: 80px;
}
.operation .operation_right > div {
    margin: 5px 0 15px 0;
}
.operation .operation_right .work_icon {
    display: inline-block;
    vertical-align: middle;
}
.operation .operation_right .work_icon span {
    width: 28px;
    height: 28px;
    display: inline-block; /*background-color:#3C8DBC;border-radius: 50%;*/
    cursor: pointer;
    margin: 0 5px;
}
.operation .operation_right .work_icon span div {
    display: inline-block;
    width: 28px;
    height: 28px;
    background: url("~@/assets/images/icons_new.png") -1px -51px no-repeat;
    /* background: url(css/images/icons_new.png) -1px -51px no-repeat; */
}
.operation .operation_right .work_icon span.narrow_icon div {
    background-position: -31px -51px;
}
.operation .operation_right .work_icon span.strong_icon div {
    background-position: -61px -51px;
}
.operation .operation_right .work_icon span.weak_icon div {
    background-position: -91px -51px;
}
.operation .operation_right .work_icon span.near_icon div {
    background-position: -121px -51px;
}
.operation .operation_right .work_icon span.far_icon div {
    background-position: -151px -51px;
}

.operation .operation_right .work_icon span div:hover {
    background-position: -1px -81px;
}
.operation .operation_right .work_icon span.narrow_icon div:hover {
    background-position: -31px -81px;
}
.operation .operation_right .work_icon span.strong_icon div:hover {
    background-position: -61px -81px;
}
.operation .operation_right .work_icon span.weak_icon div:hover {
    background-position: -91px -81px;
}
.operation .operation_right .work_icon span.near_icon div:hover {
    background-position: -121px -81px;
}
.operation .operation_right .work_icon span.far_icon div:hover {
    background-position: -151px -81px;
}
</style>