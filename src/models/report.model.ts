import  moment from "moment";
import { ghippsMsgs } from "../utils/ghipps_code";
import { EnumTransactionTypes } from "./transactiontypes.enum";

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
    reason: string='';
    debit_transaction:any;
    payment_account_type:string;
    debit_status:string;
    credit_transaction:any;
    bill_transaction:any;
    ecard_transaction:any;
    reversal_status : string;
    elevyCharges: string;


    constructor(report:any){

        //console.log(report.refund_status)

        this.debit_transaction=report.debit_transaction;
        this.debit_status=report.debit_status;
        this.credit_transaction=report.credit_transaction;
        this.bill_transaction=report.bill_transaction;
        this.ecard_transaction=report.ecard_transaction;
        
        this._id=report._id;
        this.createdAt=moment(report.createdAt).format('DD/MM/YYYY');
        this.time=moment(report.createdAt).format('HH:mm A');
        this.customerName=report.customerId?.fullname || report.customerId?.merchant_tradeName;
        this.customerPhone=report.customerId?.phone;
        this.transaction_type=report.transaction_type;
        this.getTransactionType(report.transaction_type);
        this.actualAmount=`GHS${report.actualAmount}`;
        this.charges=`GHS${Number.parseFloat(report.charges).toFixed(2)}`;
        this.amount=`GHS${Number.parseFloat(report.amount).toFixed(2)}`;
        this.paymentNumber=report.payment_account_number;
        this.paymentName=report.payment_account_name;
        this.recipientName=report.recipient_account_name;
        this.recipientNumber=report.recipient_account_number;
        this.recipientIssuer = report.recipient_account_issuer_name;
        this.reference=report.reference;
        this.paymentIssuer = report.payment_account_issuer ? report.payment_account_issuer : "WALLET" 
        this.status = report.status;
        this.getStatus(report.status);
        this.description = report.description;
        this.payment_account_type=report.payment_account_type;
        this.reversal_status = report.reversal_status;
        this.elevyCharges = report.elevyCharges;
    };

    getStatus(status:string){
        switch (status) {
            case 'pp':
                this.status='AUTHORIZATION PENDING';
                break;
            default:
                this.status=status.toUpperCase();
                break;
        }
    }

    getTransactionType(type:string){
        switch(type){
            case'RF':
            this.transaction_type= EnumTransactionTypes.RF;
            break;
            case 'DB':
              this.transaction_type= EnumTransactionTypes.DB;
              break;
            case 'CA':
                this.transaction_type= EnumTransactionTypes.CA;
             break;
            case 'SM':
              this.transaction_type= EnumTransactionTypes.SM;
              break;
            case 'RM':
              this.transaction_type= EnumTransactionTypes.RM;
              break;
            case 'PB':
               this.transaction_type= EnumTransactionTypes.PB;
                break;
            case 'AT':
                this.transaction_type= EnumTransactionTypes.AT;
                break;
            case 'PP':
                this.transaction_type= EnumTransactionTypes.PP;
                break;
            case 'QRP':
                this.transaction_type= EnumTransactionTypes.QRP;
                break;
            case 'VCI':
                this.transaction_type= EnumTransactionTypes.VCI;
                break;
            case 'VCT':
                this.transaction_type= EnumTransactionTypes.VCT;
                break;
            case 'APIC':
               this.transaction_type= EnumTransactionTypes.APIC;
               break;
            case 'ECARDS':
                this.transaction_type= EnumTransactionTypes.ECARDS;
                break;
            case 'VCTR':
                this.transaction_type= EnumTransactionTypes.VCTR;
                break;
            case 'WF':
                this.transaction_type= EnumTransactionTypes.WF;
                break;
            case 'ST':
                this.transaction_type= EnumTransactionTypes.ST;
                break;
            case 'BI':
                 this.transaction_type= EnumTransactionTypes.BI;
                 break;
            default:
                this.transaction_type=type
        }
    }

    // getIssuerName=(code:string,issuers:any[]=[])=>{
    //     try {

    //         const issuer=issuers.find((d)=>d.id ===code);
    //         if(issuer && issuer.shortName){
    //             this.recipientIssuer=issuer.shortName;
    //         }
    //     } catch (err) {
    //     }
    // };
    

    // getPaymentIssuer=(code:string,issuers:any[]=[])=>{
    //     try {
    //         const issuer=issuers.find((d)=>d.id === code);
    //         if(issuer && issuer.shortName){
    //             this.paymentIssuer=issuer.shortName;
    //         }
    //         return this.paymentIssuer;
    //     } catch (err) {
    //     }      
    // };


    getReason = ():string => {
        try{
           
            let reason:string='';
            switch (this.debit_status) {
                case 'paid':
                    switch (this.transaction_type) {
                        case 'AT':
                        case 'PB':
                               reason=this.bill_transaction.responseMessage;  
                            break;
                        case 'ECARDS':
                            reason=this.ecard_transaction?.ResponseMessage || ''
                            break;
                        default:
                            
                            reason=ghippsMsgs[this.credit_transaction.ActCode]
                            break;
                    }
                    break;
                default:
                    if(typeof this.debit_transaction === 'string'){
                         reason=this.debit_transaction;
                    }else {
                        switch (this.payment_account_type) {
                            case 'momo':
                                reason= this.debit_transaction.Message;
                                break;
                            case 'card':
                                reason= this.debit_transaction.response.acquirerMessage;
                                break;
                            default:
                                reason= ''
                                break;
                        }
                    }
                    break;
            }
            return reason;
        } catch(err){            
            return '';
        }
    }
}
