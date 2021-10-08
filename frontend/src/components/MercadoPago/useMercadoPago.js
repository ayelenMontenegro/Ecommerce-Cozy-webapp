import { useEffect, useState } from "react"
import useScript from "./useScript"

export default function useMercadoPago(x) {
    const [resultPayment, setResultPayment] = useState(undefined)
    const { MercadoPago } = useScript(
        "https://sdk.mercadopago.com/js/v2",
        "MercadoPago"
    )
    const formConfig = {
        id: "form-checkout",
        cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular de la tarjeta",
        },
        cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
        },
        cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número de la tarjeta",
        },
        cardExpirationMonth: {
            id: "form-checkout__cardExpirationMonth",
            placeholder: "Mes de vencimiento",
        },
        cardExpirationYear: {
            id: "form-checkout__cardExpirationYear",
            placeholder: "Año de vencimiento",
        },
        securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de seguridad",
        },
        installments: {
            id: "form-checkout__installments",
            placeholder: "Cuotas",
        },
        identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
        },
        identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número de documento",
        },
        issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emisor",
        },
    }
    useEffect(() => {
        if(MercadoPago){
            const mp = new MercadoPago("TEST-17812741-dd00-4207-b735-b9d1d47d8d96")
            const cardForm = mp.cardForm({
                amount: x,
                autoMount: true,
                form: formConfig,
                callbacks:{
                    onFormMounted: (error) => {if(error)return console.warn("Form Mounted handling error: ",error)},
                    onSubmit: (event) => {
                        event.preventDefault();
                        const {paymentMethodId: payment_method_id,issuerId: issuer_id,cardholderEmail: email,amount,token,installments,identificationNumber,identificationType} = cardForm.getCardFormData();
                        fetch(`http://localhost:4000/api/process-payment`,{
                                method: "POST",
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Request-Method":
                                        "GET, POST, DELETE, PUT, OPTIONS",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    token,
                                    issuer_id,
                                    payment_method_id,
                                    transaction_amount: parseInt(x),
                                    installments: Number(installments),
                                    description: "Descripción del producto",
                                    payer: {
                                        email,
                                        identification: {
                                            type: identificationType,
                                            number: identificationNumber,
                                        },
                                    },
                                }),
                            }
                        )
                        .then((res) => res.json())
                        .then((data) => setResultPayment(data))
                        .catch((err) => setResultPayment(err))
                    },
                    onFetching: (resource) => {
                        const progressBar = document.querySelector(".progress-bar")
                        progressBar.removeAttribute("value");
                        return () => progressBar.setAttribute("value", "0")
                    },
                },
            })
        }
    }, [MercadoPago]);

    return resultPayment;
}
