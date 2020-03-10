<template>
  <div>
    <Row class="expand-row" style="margin-top: 30px" v-for="(item, index) in row" :key='index'>
     <Col span="3">
       <p>物流公司：{{item.expressCompany}}</p>
       <br>
       <p>物流单号：{{item.expressNumber}}</p>
     </Col>
      <Col>
        <span >商品名称：{{item.productName}}</span>
       </Col>
      </Row>

  </div>

</template>
<script>
  export default {
    props: {
      row:Array ,
    },
    // data () {
    //   return {
    //     valueRow:this.row.orderExpressList,
    //     stopStationList:[]
    //   }
    // },
    created(){
      // this.stopStationList=this.row.orderExpressList


    },
    methods: {

    },
    mounted(){
    }
  }

</script>

