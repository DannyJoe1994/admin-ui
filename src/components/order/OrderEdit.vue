<template>
  <div>

    <el-button @click="dialogFormVisible = true,toEditOrder()"
               type="text"
               icon="el-icon-edit"
               size="mini">
    </el-button>

    <el-dialog title="修改订单"
               :visible.sync="dialogFormVisible"
               width='60%'
               :show-close=false
               :close-on-press-escape=false
               :close-on-click-modal="false"
               append-to-body>

      <el-form :model="form"
               :inline="true"
               size="mini">

        <div>
          <el-form-item>
            <el-radio v-model="form.orderType" v-for="item in orderTypes" :key="item" :label="item" border>
              {{item}}
            </el-radio>
          </el-form-item>
        </div>

        <el-form-item label="序号">
          <el-input v-model="form.orderId" autocomplete="off" style="width:130px" disabled></el-input>
        </el-form-item>
        <el-form-item label="单号">
          <el-input v-model="form.orderNo" autocomplete="off" style="width:200px" disabled></el-input>
        </el-form-item>
        <el-form-item label="总额">
          <el-input v-model="form.totalAmount" autocomplete="off" style="width:90px" disabled></el-input>
        </el-form-item>
        <el-form-item label="实收">
          <el-input v-model="form.actualAmount" autocomplete="off" style="width:170px" clearable></el-input>
        </el-form-item>
        <el-form-item label="经销商">
          <el-autocomplete v-model="form.brokerName"
                           :fetch-suggestions="queryBroker"
                           style="width:200px"></el-autocomplete>
        </el-form-item>
        <el-form-item label="生产商">
          <el-select v-model="form.factory" placeholder="">
            <el-option  label="木源门业" value="木源门业"></el-option>
            <el-option  label="鸿达门业" value="鸿达门业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区">
          <el-select v-model="form.region" placeholder="">
            <el-option v-for="item in regions" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="form.customerName" autocomplete="off" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.customerPhone" autocomplete="off" style="width:163px" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.customerAddress" autocomplete="off" style="width:416px" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off" style="width:416px" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,editOrder()">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        orderTypes: localStorage.getItem("orderTypes").split(","),
        regions: localStorage.getItem("regions").split(","),
        suggestBroker: [],
        form: {
          selected: '1',
          orderId: '',
          orderNo: '',
          orderType: '',
          brokerName: '',
          factory:'',
          region: '',
          customerName: '',
          customerPhone: '',
          customerAddress: '',
          totalAmount: '',
          actualAmount: '',
          remark: '',
        }
      };
    },
    methods: {
      toEditOrder: function () {
        const param = {};
        param.orderId = this.orderId;
        this.$post("/order/queryById", param).then((response) => {
          if (response.code == 1) {
            this.form = response.data;
          }
        });
      },
      queryBroker: function (queryString, cb) {
        this.loadBroker();
        const suggestBroker = this.suggestBroker;
        const results = queryString ? suggestBroker.filter(this.createFilter(queryString)) : suggestBroker;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (broker) => {
          return (broker.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      editOrder: function () {
        this.$post("/order/update", this.form).then((response) => {
          if (response.code == 1) {
            //重新加载列表数据
            this.$emit('queryOrder');
            this.$notify({
              type: 'success',
              message: '修改成功!'
            });
          }
        });
      },
      loadBroker: function () {
        this.$post("/broker/queryAllName").then(response => {
          if (response.code == 1) {
            this.suggestBroker = [];
            const nameList = response.data;
            for (const name of nameList) {
              const broker = {};
              broker.value = name;
              this.suggestBroker.push(broker);
            }
          }
        });
      }
    },
    props: [
      "orderId"
    ]
  };
</script>

<style scoped>

</style>
