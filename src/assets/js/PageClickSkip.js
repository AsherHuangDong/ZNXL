class PageClickSkip {
  /**
   iview的page分页加电梯跳转按钮
   */
  getListdefore (pageId) {
    var evtObj;
    var thisPage=document.getElementById(pageId);
    var elevatorDiv=thisPage.getElementsByClassName("ivu-page-options-elevator");
    if(elevatorDiv && elevatorDiv.length>0){
      var pageInput = elevatorDiv[0].getElementsByTagName("input")[0];
      if (window.KeyEvent) {//firefox 浏览器下模拟事件
        evtObj = document.createEvent('KeyEvents');
        evtObj.initKeyEvent("keyup", true, true, window, true, false, false, false, 13, 0);
      } else {//chrome 浏览器下模拟事件
        evtObj = document.createEvent('UIEvents');
        evtObj.initUIEvent("keyup", true, true, window, 1);
        delete evtObj.keyCode;
        if (typeof evtObj.keyCode === "undefined") {//为了模拟keycode
          Object.defineProperty(evtObj, "keyCode", { value: 13 });
        } else {
          evtObj.key = String.fromCharCode(13);
        }
      }
      pageInput.dispatchEvent(evtObj);
    }
  }
}
export default new PageClickSkip()
