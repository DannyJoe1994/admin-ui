<template>
  <div>
    <el-button @click="dialogFormVisible = true,toOrderDetail()"
               type="text"
               icon="el-icon-more"
               size="small">
    </el-button>

    <el-dialog title="添加订单"
               :visible.sync="dialogFormVisible"
               width='95%'
               :show-close=false
               :close-on-press-escape=false
               :close-on-click-modal="false"
               append-to-body>

      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addDetailItem()"
                 size='mini'
                 style="margin-bottom: 10px">添加
      </el-button>

      <!-- 抬头 -->
      <el-form :inline="true" :model="{}" class="demo-form-inline" size='mini' disabled>
        <div>
          <el-form-item>
            <el-input placeholder="名称" class="el-select_box input-order-sm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="颜色" class="el-select_box input-order-md"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="线条" class="el-select_box input-order-md"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="高" class="el-select_box input-order-sm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="宽" class="el-select_box input-order-sm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="厚" class="el-select_box input-order-sm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="数量" class="el-select_box input-order-sm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="单价" class="el-select_box input-order-md"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="备注" class="el-select_box input-order-md"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <el-form :inline="true" :model="order" class="demo-form-inline" size='mini'>
        <!-- 动态生成的 -->
        <div class="moreRules">
          <div class="moreRulesIn" v-for="(item, index) in order.orderDetails" :key="item.key">
            <el-form-item label="" :prop="'orderDetails.' + index +'.name'">
              <el-select v-model="item.productName" placeholder="请选择" class="el-select_box input-order-sm">
                <el-option v-for="item in nameOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" :prop="'orderDetails.'+ index +'.color'">
              <el-select v-model="item.color" placeholder="请选择" class="el-select_box input-order-md">
                <el-option v-for="item in colorOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" :prop="'orderDetails.'+ index +'.stripe'">
              <el-select v-model="item.stripe" placeholder="请选择" class="el-select_box input-order-md">
                <el-option v-for="item in stripeOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" :prop="'orderDetails.'+ index +'.hight'">
              <el-input v-model="item.height" placeholder="高" class="el-select_box input-order-sm"></el-input>
            </el-form-item>
            <el-form-item label="" :prop="'orderDetails.'+ index +'.width'">
              <el-input v-model="item.width" placeholder="宽" class="el-select_box input-order-sm"></el-input>
            </el-form-item>
            <el-form-item label="" :prop="'orderDetails.'+ index +'.deep'">
              <el-input v-model="item.thickness" placeholder="厚" class="el-select_box input-order-sm"></el-input>
            </el-form-item>
            <el-form-item label="" :prop="'orderDetails.'+ index +'.count'">
              <el-input v-model="item.count" placeholder="数量" class="el-select_box input-order-sm"></el-input>
            </el-form-item>
            <el-form-item label="" :prop="'orderDetails.'+ index +'.price'">
              <el-input v-model="item.price" placeholder="单价" class="el-select_box input-order-md"></el-input>
            </el-form-item>
            <el-form-item label="" :prop="'orderDetails.'+ index +'.remark'">
              <el-input v-model="item.remark" placeholder="备注" class="el-select_box input-order-md"></el-input>
            </el-form-item>

            <el-button @click="deleteDetailItem(item, index)" size="mini">删除</el-button>

          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-input v-model='getTotalAmount'
                  size='mini'
                  class='el-select_box input-order-bg'
                  style="margin-right: 10px"
                  disabled>
          <template slot="prepend">总金额</template>
        </el-input>
        <el-button @click="dialogFormVisible = false" size='mini'>取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,saveOrderDetail()" size='mini'>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        nameOptions: localStorage.getItem('productTypes').split(","),
        colorOptions: localStorage.getItem('colors').split(","),
        stripeOptions: localStorage.getItem("stripes").split(","),
        order: {
          orderDetails: [],
        }
      };
    },
    props: [
      "orderId"
    ],
    methods: {
      toOrderDetail() {
        const param = {};
        param.orderId = this.orderId;
        this.$post("/order/queryDetail", param).then((response) => {
          if (response.code == 1) {
            this.order.orderDetails = response.data;
          }
        })
      },
      addDetailItem() {
        this.order.orderDetails.push({
          productName: '',
          color: '',
          stripe: '',
          height: '',
          width: '',
          thickness: '',
          count: '',
          price: '',
          remark: ''
        })
      },
      deleteDetailItem(item, index) {
        this.index = this.order.orderDetails.indexOf(item)
        if (index !== -1) {
          this.order.orderDetails.splice(index, 1)
        }
      },
      saveOrderDetail() {
        const param = {};
        param.orderId = this.orderId;
        param.totalAmount = this.getTotalAmount;
        param.details = this.order.orderDetails;
        this.$post("/order/saveDetail", param).then((response => {
          if (response.code == 1) {
            this.$emit('queryOrder');
            this.$notify({
              type: 'success',
              message: '保存成功!'
            });
          }
        }));
      }
    },
    computed: {
      //todo 不同品类的计算逻辑不一样
      getTotalAmount: function () {
        let totalAmount = 0;
        this.order.orderDetails.forEach((item) => {
          totalAmount += item.count * item.price;
        });
        return totalAmount;
      }
    },
    mounted: function () {

    }
  };
</script>

<style>
  .input-order-sm {
    width: 70px;
  }

  .input-order-md {
    width: 100px;
  }

  .input-order-bg {
    width: 180px;
  }
</style>
