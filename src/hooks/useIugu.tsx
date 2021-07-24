import { isProduction } from "config/contants";
import { useEffect } from "react";

const Iugu = {
  impl() {
    const newWindow: any = window;

    if (!newWindow.Iugu) {
      throw new Error("Iugu script has not been loaded yet.");
    }

    return newWindow.Iugu;
  },

  setAccountToken(token: any) {
    this.impl().setAccountID(token);
  },

  setTestMode(mode: any) {
    this.impl().setTestMode(mode);
  },

  createPaymentToken(form: any, throwOnError = false) {
    return new Promise((resolve, reject) => {
      this.impl().createPaymentToken(form, (response: any) => {
        if (response.errors && throwOnError) {
          return reject(response);
        }

        resolve(response);
      });
    });
  },

  async creditCard(data: any) {
    const splited = data.holder.split(" ");
    let surname = "";

    for (let i = 0; i < splited.length; i++) {
      const element = splited[i];

      if (i !== 0) {
        surname += element + " ";
      }
    }

    return await this.impl().CreditCard(
      data.number,
      data.expirationMonth,
      data.expirationYear,
      splited[0],
      surname,
      data.cvv
    );
  },

  async validateCreditCardNumber(cardNumber: string) {
    return await this.impl().utils.validateCreditCardNumber(cardNumber);
  },

  async validateCVV(cvv: string, brand: string) {
    return await this.impl().utils.validateCVV(cvv, brand);
  },

  async validateExpiration(expiration: string) {
    return await this.impl().utils.validateExpirationString(expiration);
  },

  async getBrandByCreditCardNumber(cardNumber: string) {
    return await this.impl().utils.getBrandByCreditCardNumber(cardNumber);
  },
};

export default function useIugu(accountId: any) {
  useEffect(() => {
    if (document.getElementById("iugu-script")) {
      Iugu.setAccountToken(accountId);
      // Iugu.setTestMode(!isProduction);
      Iugu.setTestMode(false);

      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.iugu.com/v2";
    script.id = "iugu-script";

    script.onload = () => {
      Iugu.setAccountToken(accountId);
      // Iugu.setTestMode(!isProduction);
      Iugu.setTestMode(false);
    };

    document.head.appendChild(script);

    // return () => {
    //   const newDocument: any = document;
    //   newDocument.getDocumentById("iugu-script").remove();
    // };
  }, [accountId]);

  return Iugu;
}
