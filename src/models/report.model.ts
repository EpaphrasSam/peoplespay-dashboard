import  moment from "moment";


export class ReportModel {

    _id:string;
    createdAt:string;
    time:string;
    transaction_type:string;
    customerName:string;
    customerPhone:string;
    actualAmount:string;
    charges:string;
    amount:string;
    status:string;
    recipientNumber:string;
    recipientName:string;
    recipientIssuer:string;
    paymentNumber:string;
    paymentName: string;
    paymentIssuer:string;
    reference:string;
    description : string;





    constructor(report:any){
        this._id=report._id;
        this.createdAt=moment(report.createdAt).format('YYYY/MM/DD');
        this.time=moment(report.createdAt).format('HH:mm A');
        this.customerName=report.customerId?.fullname;
        this.customerPhone=report.customerId?.phone;
        this.transaction_type=report.transaction_type;
        this.actualAmount=`GHS${report.actualAmount}`;
        this.charges=`GHS${report.charges}`;
        this.amount=`GHS${report.amount}`;
        this.paymentNumber=report.payment_account_number;
        this.paymentName=report.payment_account_name;
        this.recipientName=report.recipient_account_name;
        this.recipientNumber=report.recipient_account_number;
        this.recipientIssuer = report.recipient_account_issuer_name;
        this.reference=report.reference;
        this.paymentIssuer = report.payment_account_issuer_name;
        this.status = report.status;
        this.getStatus(report.status);
        this.description = report.description;
    };

    getStatus(status:string){
        switch (status) {
            case 'pp':
                this.status='AUTHORIZATION FAILED';
                break;
            default:
                this.status=status.toUpperCase();
                break;
        }
    }

    getIssuerName=(code:string,issuers:any[]=[])=>{
        try {
            const issuer=issuers.find((d)=>d.id ===code);
            if(issuer && issuer.shortName){
                this.recipientIssuer=issuer.shortName;
            }
        } catch (err) {
        }
        
    };

    getPaymentIssuer=(code:string,issuers:any[]=[])=>{
        try {
            const issuer=issuers.find((d)=>d.id ===code);
            if(issuer && issuer.shortName){
                this.paymentIssuer=issuer.shortName;
                return this.paymentIssuer;
            }
        } catch (err) {
        }      
    };
}