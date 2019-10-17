<template>
    <div class="myTree">
        <el-scrollbar class="page-component__scroll">
            <el-tree v-if="treeData.length>0" :data="treeData" show-checkbox node-key="key" ref="tree" :default-expanded-keys="[]" :default-checked-keys="checkData"
                :props="defaultProps" style="height: 280px" @check-change="handleCheckChange">
            </el-tree>
        </el-scrollbar>
    </div>
</template>
<script>
    export default {
        name: "RegionModel",
        props: {
            isAll: { type: Boolean, required: true }, //是否存在全部选项
            initData: { type: Array, required: true }, //是否存在全部选项
        },
        data() {
            return {
                dicts: [],
                treeData: [],
                checkData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

                regionIds: [],
                regionIds_name: ""
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            // 获取库房--区
            init() {
                var _this = this;
                this.$api.commonInterface.initStoreRoom().then(res => {
                    for (var item of res.rows) {
                        var fkStoreId = item.id;
                        var treepLen = this.dicts.length;
                        var obj = {};
                        obj['id'] = item.id;
                        obj['menuName'] = item.storeName;
                        obj['fkParentId'] = 0;
                        obj['selectFlag'] = false;
                        this.dicts.push(obj);
                        this.$api.commonInterface.initstoTbRegion({ fkStoreId }).then(res => {
                            for (var key of res.rows) {
                                // 设置被选中的
                                var obj = {};
                                if (this.initData.indexOf(key.id) != -1) {
                                    obj['selectFlag'] = true;
                                } else {
                                    obj['selectFlag'] = false;
                                }
                                obj['id'] = key.id;
                                obj['menuName'] = key.regionName;
                                obj['fkParentId'] = key.fkStoreId;
                                this.dicts.push(obj);
                                this.dataChange();
                            }
                        });
                    }
                });
            },

            dataChange() {
                let checkMenus = [];
                let result = this.dicts.reduce(function (prev, item) {
                    let ss = {
                        label: item.menuName,
                        key: item.id,
                        selectFlag: item.selectFlag
                    };
                    prev[item.fkParentId] ? prev[item.fkParentId].push(ss) : (prev[item.fkParentId] = [ss]);
                    return prev;
                }, {});
                for (let prop in result) {
                    result[prop].forEach(function (item, i) {
                        result[item.key] ? (item.children = result[item.key]) : "";
                        if (!item.children && item.selectFlag) {
                            checkMenus.push(item.key)
                        }
                    });
                }
                if (this.isAll) {
                    result[0].unshift({ label: "全部", key: "", })
                }
                this.treeData = result[0];
                this.checkData = checkMenus;
            },
            // 节点选择
            handleCheckChange(data, checked, indeterminate) {
                this.regionIds = [];
                this.regionIds_name = '';
                let region_arr = [];
                let idNodes = this.$refs.tree.getCheckedNodes(false, true);
                for (let node of idNodes) {
                    if (node.children) {
                        continue;
                    } else {
                        this.regionIds.push(node.key);
                        region_arr.push(node.label);
                        this.regionIds_name = region_arr.toString();
                    }
                }
                this.$emit('nodeClick', this.regionIds, this.regionIds_name);
            },
        },
        //节点过滤
        searchModel(val) {
            console.log(val);
            this.$refs.tree.filter(val);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }

    };
</script>
<style scoped>
    .el-scrollbar>>>.el-scrollbar__view,
    .el-tree {
        height: 100%;
    }

    .el-scrollbar>>>.el-tree .el-tree-node .el-tree-node__content:hover,
    .el-scrollbar>>>.el-tree .el-tree-node.is-current>.el-tree-node__content {
        color: var(--activecolor);
    }

    .el-scrollbar>>>.el-tree .el-tree-node>.el-tree-node__content {
        background: #fff;
    }

    /*!*tree滚动条*!*/

    div.myTree {
        height: calc(100% - 62px)
    }

    .page-component__scroll {
        height: 100%;
    }

    .page-component__scroll>>>.el-scrollbar__wrap {
        overflow-x: auto;
    }

    .el-scrollbar>>>.el-scrollbar__thumb {
        background-color: var(--activecolor);
    }
</style>