import { URL_42 as URL } from "/src/Components/Constants";


export default function Go() {

  var child = window.open(
    URL,
    "_blank",
    "height=400,width=600"
  );

  var leftDomain = false;

  var interval = setInterval(function () {
    console.log('checking..');
    try {
      if (child.document.domain === document.domain) {
        console.log(1);
        if (child.document.readyState === "complete") {
          console.log(222222);
          console.log('yaay');
          console.log(child.document.URL);
          var url = new URL(child.document.URL);
          console.log(url);

          console.log('yaay2');
          // let code = url.searchParams.get('code');
          // console.log(code);
          clearInterval(interval);
          child.close();
        }
      } else {
        // this code should never be reached,
        // as the x-site security check throws
        // but just in case
        console.log(3);
        leftDomain = true;
      }
    } catch (e) {
      // we're here when the child window has been navigated away or closed
      console.log(4);
      if (child.closed) {
        console.log(5);
        clearInterval(interval);
        alert("closed");
        return;
      }
      // navigated to another domain
      leftDomain = true;
    }
  }, 500);
}
