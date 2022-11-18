import PaymentForm from "../payment-form/payment-form.component";
import MailchimpSubscribe from "react-mailchimp-subscribe";

type formDataType = {
    EMAIL: string,
    FNAME: string | null,
    ADDRESS: {
        addr1: string,
        city: string,
        state:string,
        zip:string
    }
}

const MailchimpFormContainer = () => {

    const postUrl = `https://gmail.us14.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&amp;id=${process.env.REACT_APP_MAILCHIMP_ID}`
    
    return (
    <MailchimpSubscribe
        url={postUrl}
        render={({subscribe, status, message}) => (
            <PaymentForm 
            status = {status}
            message={message}
            onValidated={(formData: formDataType) => subscribe(formData)}
            />
        )}
    />
    )
}

export default MailchimpFormContainer;