import { Linking } from "react-native";
import { alert } from '../util/modal';
import { Linking as ExpoLinking } from 'expo';

const tunnelUrl = "exp://pf-8tu.adaszyn.billsplit-app.exp.direct:80";

const getSwishPayload = (number, amount) => ({
  version: 1,
  payee: {
    value: number
  },
  amount: {
    value: amount
  },
  message: {
    value: "Message from BillSplit app",
    editable: true
  }
});

const getUrl = (number, amount, billId, paymentId) => {
  const payload = encodeURIComponent(
    JSON.stringify(getSwishPayload(number, amount))
  );
  const paymentDetails = encodeURIComponent(JSON.stringify({
    billId, paymentId
  }))
  let redirectUrl = ExpoLinking.makeUrl(`bill?paymentDetails=${paymentDetails}`, { });

  return `swish://payment?data=${payload}&callbackurl=${redirectUrl}&callbackresultparameter=swishresponse`;
};

export const SwishUtil = {
  createPayment(number, amount, billId, paymentId) {
    const url = getUrl(number, amount, billId, paymentId);
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          alert("Swish error", "Cannot open Swish App")
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
          alert("Swish error", "Cannot open Swish App")
      });
  }
};
